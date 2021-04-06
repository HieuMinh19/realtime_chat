const moment = require('moment');

function formatMessage(user_name, message) {
    return {
        user_name,
        message,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;