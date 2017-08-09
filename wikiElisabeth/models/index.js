var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack',{
  logging: false
});

var Page = db.define("Page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isURL: true
    }

  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
},
{
  getterMethods: {
    route(){
      return '/wiki/' + this.urlTitle;
    }
  }
})

var User = db.define('User', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
})

module.exports = {db};
