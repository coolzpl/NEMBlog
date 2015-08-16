var moment = require('moment');

module.exports = function (orm, db) {
  var Comment = db.define('comment', {
    id : {type : 'serial', key : true},
    post_org_id : {type: 'text', size : 50},
    post_slug : {type : 'text', size : 60},
    author : {type : 'text', size : 60, required : true},
    email : {type : 'text', size : 60},
    url : {type : 'text', size : 200},
    ip : {type : 'text', size : 50},
    status : {type: 'integer', size : 2},
    content      : { type: 'text', size : 255, required : true},
    created : { type: 'date', required : true, time : true }
  },
  {
    hooks: {
      beforeValidation: function () {
        this.created = new Date();
      }
    },
    validations: {
      content   : orm.enforce.ranges.length(1, 1024)
    },
    methods: {
      serialize: function () {
        return {
          id : this.id,
          post_org_id : this.post_org_id,
          post_slug : this.post_slug,
          author : this.author,
          email : this.email,
          url : this.url,
          ip : this.ip,
          status : this.status,
          content      : this.content,
          created : moment(this.created).fromNow()
        }
      }
    }
  });

  Comment.hasOne('message', db.models.message, { required: true, reverse: 'comments', autoFetch: true });
};