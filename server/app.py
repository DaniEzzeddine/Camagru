from config import Config
import json
from werkzeug.exceptions import BadRequest
from werkzeug.utils import secure_filename
from flask import Flask, request, Response
from validation_service import *
from mongoengine  import *
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
from mail import get_message
from flask_mail import Mail, Message
import sys
import os
import uuid
from flask import jsonify, send_from_directory
import smtplib, ssl
from itsdangerous import URLSafeTimedSerializer
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
app = Flask(__name__)
app.config.from_object(Config)
jwt = JWTManager(app)
ts = URLSafeTimedSerializer(app.config["SECRET_KEY"])
mail = Mail(app)
bcrypt = Bcrypt(app)
CORS(app, support_credentials=True)
context = ssl.create_default_context()
# app.config['MONGOALCHEMY_DATABASE'] = 
connect(db=app.config['MONGO_DB'], username=app.config['MONGO_USERNAME'], password=app.config['MONGO_PASSWORD'], host=app.config['MONGO_HOST'])
from models import User, Post, Comment
sender_email = "my@gmail.com"
receiver_email = "your@gmail.com" 

static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'static/uploads')


def allowed_file(filename):
    return '.' in filename and  filename.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']

@app.route('/api/auth/register', methods=['POST'])
@cross_origin(supports_credentials=True)
def auth_router():
    if (not len(request.json.get('username'))):
        return 'bad username', 400
    if (request.json['password1'] != request.json['password2']):
        return BadRequest('passwords dont match')
    if (not validate_password(request.json['password1'])):
        return BadRequest('provided password is not correct')
    if (not validate_email(request.json['email'])):
        return BadRequest('provided email is not correct')
    if User.objects(email=request.json['email'])().count() is not 0:
            return BadRequest('user with email already exist')
    if User.objects(email=request.json['username'])().count() is not 0:
            return BadRequest('user with username already exist')
    pw_hash = bcrypt.generate_password_hash(request.json['password1']).decode('utf-8')
    newuser = User(username=request.json.get('username'), email = request.json['email'], password=pw_hash)
    newuser.save()
    with smtplib.SMTP_SSL(app.config.get('MAIL_SERVER'), app.config.get('MAIL_PORT'), context=context) as server:
        server.login(app.config.get('MAIL_USERNAME'), app.config.get('MAIL_PASSWORD'))
        token = ts.dumps(request.json.get('email'), salt='CAMAGRU')
        msg = '\nverify your account on this link http://localhost:3000/password_confirm/{}'.format(token)
        server.sendmail( 'dani.izzedin@gmail.com', request.json.get('email'), msg)
    return Response("{'message': 'User created, waiting for email confirmation'}", status=201)



@app.route('/api/show_users', methods=['GET'])
@cross_origin(supports_credentials=True)
def show_users():
    all_users = User.objects()
    return (Response(all_users.to_json()))



@app.route('/api/reset_password_confirm', methods=['POST'])
@cross_origin(supports_credentials=True)
def password_confirm():
    password1 = request.json.get('password1')
    password2 = request.json.get('password2')
    print(password1, file=sys.stderr)
    print(password2, file=sys.stderr)
    token = request.json.get('token')
    try:
        email = ts.loads(token, salt='CAMAGRU', max_age=86400)
    except:
        return "invalid token", 400
    print(email, file=sys.stderr)        
    user = User.objects(email=email).first()
    if (user == None):
        return ('No user', 400)
    if (password1 != password2):
        return ('password doesnt match', 400)
    if (not validate_password(password1)):
        return ('password is invalid', 400)
    user.password = bcrypt.generate_password_hash(password1).decode('utf-8')
    user.save()
    return ('password set', 201)

@app.route('/api/password_reset/', methods=['POST'])
@cross_origin(supports_credentials=True)
def reset_password():
    with smtplib.SMTP_SSL(app.config.get('MAIL_SERVER'), app.config.get('MAIL_PORT'), context=context) as server:
        token = ts.dumps(request.json.get('email'), salt='CAMAGRU')
        server.login(app.config.get('MAIL_USERNAME'), app.config.get('MAIL_PASSWORD'))
        msg = '\nCreate new password by pressing following link: http://localhost:3000/reset/{}'.format(token)
        server.sendmail( 'dani.izzedin@gmail.com', request.json.get('email'), msg)
        return 'Password has been sent', 201




@app.route('/api/confirm_register/<token>', methods=['GET'])
@cross_origin(supports_credentials=True)
def confirm_email(token):
    try:
        email = ts.loads(token, salt='CAMAGRU', max_age=86400)
    except:
        return "invalid token", 400
    user = User.objects(email=email).first()
    user.is_active = True
    user.save()
    print (user.is_active, file=sys.stderr)
    return (Response("{'message': 'activated'}"))


@app.route('/api/login/', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    if (not validate_email(request.json.get('email'))):
        return 'bad email', 400
    if (not validate_password(request.json.get('password'))):
        return 'bad password', 400
    user = User.objects(email=request.json.get('email')).first()
    if (user is None):
        return 'user does not exist', 400
    if (not bcrypt.check_password_hash(user.password, request.json.get('password'))):
        return ('wrong password', 400)
    if (not user.is_active):
        return 'acc not validated', 400
    access_token = create_access_token(identity=user.email)
    return jsonify(jwt_token=access_token)
if __name__ == '__main__':
    app.run()


@app.route('/api/post_comment/', methods=['POST'])
@cross_origin(supports_credentials=True)
@jwt_required
def post_comment():
    print(request.json, file=sys.stderr)
    current_user = get_jwt_identity()
    content = request.json.get('content')
    user = User.objects(email=current_user).first()
    post_id = request.json.get('post_id')
    post = Post.objects(pk=post_id).first()
    new_comment = Comment(
        user = user,
        content = content
    )
    post.comments.append(new_comment)
    post.save()
    return jsonify(data={'name': user.username, 'content': content}), 200


@app.route('/api/post_image/', methods=['POST'])
@cross_origin(supports_credentials=True)
@jwt_required
def image_post():
    current_user = get_jwt_identity()
    user = User.objects(email=current_user).first()
    data = request.files.get('file')
    if data and allowed_file(data.filename):
        filename = secure_filename(user.username + '_' + str(uuid.uuid4()) + '.png')
        data.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        new_post = Post(
            author = user,
            photo = filename
        )
        new_post.save()
    return jsonify(logged_in_as=current_user), 200


@app.route('/images/<path:path>', methods=['GET'])
@cross_origin(supports_credentials=True)
def serve_files(path):
    print(static_file_dir, file=sys.stderr)
    return send_from_directory(static_file_dir, path)


@app.route('/api/get_posts/', methods=['GET'])
@cross_origin(supports_credentials=True)
@jwt_required
def get_posts():
    posts = Post.objects().all()
    arr = []
    for post in posts:
        res = {}
        res['id'] = str(post.id)
        res['photo']= post.photo
        res['username'] = post.author.username
        res['date'] = post.date
        comments = []
        for com in post.comments:
            temp = {}
            temp['name'] = com.user.username
            temp['content'] = com.content
            comments.append(temp)
        res['comments'] = comments
        res['likes'] = post.number_of_likes
        arr.append(res)
    return jsonify(data=arr), 200


if __name__ == '__main__':
    app.run()
