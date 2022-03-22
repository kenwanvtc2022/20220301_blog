const x = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/article",
  "title": "Article",
  "description": "an article in the blog",
  "type": "object",
  "properties": {
    "title": {
      "description": "Main title of the blog article",
      "type": "string"
    },
    "allText": {
      "description": "Body text of the blog article",
      "type": "string"
    },
    "summary": {
      "description": "Main title of the blog article",
      "type": "string"
    },
    "imageURL": {
      "description": "Main title of the blog article",
      "type": "uri"
    },
    "published": {
      "description": "Main title of the blog article",
      "type": "boolean"
    },
    "authorID": {
      "description": "Main title of the blog article",
      "type": "integer",
      "minimum": 0
    },
  },
  "required": ["title", "allText", "authorID"],
  "additionalProperties": false
}