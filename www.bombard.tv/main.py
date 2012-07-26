import cgi
import os
import os.path
import wsgiref.handlers
import gdata.youtube
import gdata.youtube.service
from google.appengine.ext import webapp
#from google.appengine.ext.webapp import template
from google.appengine.ext.webapp import util
from rpc import *
        
class MainPage(webapp.RequestHandler):
	def get(self):
		vid = self.request.get("vid")
		entry = {}
		if vid:
			service = gdata.youtube.service.YouTubeService()
			entry = service.GetYouTubeVideoEntry(video_id=vid)
		if entry:
			if entry.media.title.text:
				entry.media.title.text = entry.media.title.text.replace('\n', '').replace('"', '&quot;')
			if entry.media.description.text:
				entry.media.description.text = cgi.escape(entry.media.description.text.replace('\n', '').replace('"', '&quot;'))
				if entry and len(entry.media.description.text)>100:
					entry.media.description.text = cgi.escape(entry.media.description.text[:100]) + "..."
		template_file_name = 'index.html'     
		template_values = {'vid': vid, 'entry': entry}
		path = os.path.join(os.path.dirname(__file__), "templates", template_file_name)
		self.response.out.write(template.render(path, template_values)) 
        
class JoinHandler(webapp.RequestHandler):
	def get(self):
		template_file_name = 'join.html'     
		template_values = {}
		path = os.path.join(os.path.dirname(__file__), "templates", template_file_name)
		self.response.out.write(template.render(path, template_values)) 
   
class HowtoHandler(webapp.RequestHandler):
	def get(self):
		template_file_name = 'howto.html'     
		template_values = {}
		path = os.path.join(os.path.dirname(__file__), "templates", template_file_name)
		self.response.out.write(template.render(path, template_values)) 
		      
def main():
    routes = [
    	(r"/", MainPage),
        (r"/join", JoinHandler),
        (r"/howto", HowtoHandler),
        (r"/rpc", RPCHandler)
    ]
    application = webapp.WSGIApplication(routes, debug=os.environ.get('SERVER_SOFTWARE', '').startswith('Dev'))
    util.run_wsgi_app(application)

if __name__ == "__main__":
    main()
