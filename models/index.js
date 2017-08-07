const Sequelize = require('sequelize');
const db = new Sequelize ('postgres://localhost:5432/wikistack', {
    logging: false
});

let Page = db.define('pages', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        // get() {
        //     let title = this.getDataValue('title');
        //     return '/wiki/' + (title);
        // }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
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
    route() {
        return '/wiki/' + this.urlTitle;
        }
    },
    hooks: {
        beforeValidate: function(Page, options){
            console.log('running hook')
            console.log('page: ', Page)
            Page.urlTitle = urlTitleGen(Page.title);
            }
        }
    });

let User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});



module.exports = {
    db: db,
  Page: Page,
  User: User
};

function urlTitleGen(title){
    console.log('function is called')
    var re = /\s/gi
if(!title) {
    return Math.random().toString(36).substring(2,7);
}
return title.replace(re, '_')
}
