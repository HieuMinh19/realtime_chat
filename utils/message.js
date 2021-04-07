const moment = require('moment');

function formatMessage(user_name, message) {
    return {
        user_name,
        text: message,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;