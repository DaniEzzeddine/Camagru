from werkzeug.security import generate_password_hash, check_password_hash
from bson import json_util
from mongoengine import *
from datetime import datetime

class User(Document):
    username = StringField(max_length=20)
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    is_active = BooleanField(default=False)
    comment_notification = BooleanField(default=True)

class Comment(EmbeddedDocument):
    content = StringField()
    user = ReferenceField(User)
    created = DateTimeField(default=datetime.utcnow)

class Post(Document):
    photo = StringField()
    author = ReferenceField(User, reverse_delete_rule=CASCADE)
    comments = EmbeddedDocumentListField(Comment)
    number_of_likes = IntField(default=0)
    user_that_liked = ListField(EmailField(), default=[])
    date = DateTimeField(default=datetime.utcnow)

    @queryset_manager
    def objects(doc_cls, queryset):
        # This may actually also be done by defining a default ordering for
        # the document, but this illustrates the use of manager methods

        return queryset.order_by('-date')

    def add_or_replace_comment(self, comment):
        existing = self.comments.filter(created=comment.created)
        if existing.count() == 0:
             self.comments.create(comment)
        else:
             existing.update(comment)