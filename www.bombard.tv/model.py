from django.utils import simplejson
from google.appengine.ext import db

class BombardComment(db.Model):
	id = db.IntegerProperty()
	videoID = db.StringProperty(required=True)
	comment = db.StringProperty(required=True)
	likeCount = db.IntegerProperty(default=0)
	dislikeCount = db.IntegerProperty(default=0)
	created = db.DateTimeProperty(auto_now_add=True)	