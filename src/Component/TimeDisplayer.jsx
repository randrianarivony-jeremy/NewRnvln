import React from 'react';
import Moment from 'react-moment';
// import 'moment/locale/fr';
import moment from 'moment/min/moment-with-locales';

const TimeDisplayer = ({dateToFormat}) => {
    moment.updateLocale('en', {
        relativeTime : {
            hh: "LT",
            d:  "LT",
            dd: "LT",
            w:  "LT",
            ww: "%d weeks",
            M:  "a month",
            MM: "%d months",
            y:  "a year",
            yy: "%d years"
        }
    });
    // Moment.globalFormat='HH:mm';
    Moment.globalLocal=true;
    Moment.globalLocale='fr';
    Moment.globalMoment = moment;

    return (
        // <Moment calendar={calendarStrings} date={dateToFormat} />
        <Moment fromNow>
        {/* <Moment calendar={calendarStrings}> */}
                2023-04-23T05:00:55.332+00:00
            </Moment>
    );
};

export default TimeDisplayer;