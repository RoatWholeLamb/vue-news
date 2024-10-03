import moment from 'moment';

const time={
    formatTime(date){
        return moment(date).format('YYYY-MM-DD hh:mm:ss');
    }
}

export default time;