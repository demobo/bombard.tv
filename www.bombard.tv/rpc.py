from lib.util import *
from lib.gae_json import *
from decimal import *
import model
import logging
from datetime import datetime
import simplejson as json
from google.appengine.ext import db

class RPCHandler(webapp.RequestHandler):
    """ Allows the functions defined in the RPCMethods class to be RPCed."""
    def __init__(self):
        webapp.RequestHandler.__init__(self)
        self.methods = RPCMethods()

    def post(self):
        func = None
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        action = self.request.get('action')
        if action:
            if action[0] == '_':
                self.error(403) # access denied
                return
            else:
                func = getattr(self.methods, action, None)

        if not func:
            self.error(404) # file not found
            return

        args = ()
        while True:
            key = 'arg%d' % len(args)
            val = self.request.get(key)
            if val:
                args += (simplejson.loads(val),)
            else:
                break
        kwargs = {}
        result = func(*args, **kwargs)
        self.response.out.write(simplejson.dumps(result))


class RPCMethods:
    """ Defines the methods that can be RPCed.
    NOTE: Do not allow remote callers access to private/protected "_*" methods.
    """  
    def saveComment(self, *args, **kwargs):
        videoID = args[0]
        comment = args[1]
        commentObject = model.BombardComment(videoID = videoID, comment = comment)
        commentObject.put()
    def loadComment(self, *args, **kwargs):
    	videoID = args[0]
    	limit = args[1]
    	commentObjects = db.GqlQuery("SELECT * FROM BombardComment WHERE videoID = '" + videoID + "' order by created DESC").fetch(limit)
    	# commentObjects = model.BombardComment.all().filter('videoID = ',videoID).order('-created').fetch(limit)
    	for comment in commentObjects:
    		comment.id = comment.key().id()
        if not commentObjects:
            return None;
        return encode(commentObjects)
    def likeComment(self, *args, **kwargs):
        commentID = args[0]
        commentObject = model.BombardComment.get_by_id(commentID)
        commentObject.likeCount += 1
        commentObject.put()
    def dislikeComment(self, *args, **kwargs):
        commentID = args[0]
        commentObject = model.BombardComment.get_by_id(commentID)
        commentObject.dislikeCount += 1
        commentObject.put()        