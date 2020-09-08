const { time, reservation, time_date_disabled, date_disabled, reservation_time } = require('../app/models');

const moment = require('moment');

module.exports = {
    async getDates(req, res) {
        const dates_disabled = await date_disabled.findAll();
        var new_dates_disabled = {};
        dates_disabled.map(date_disabled => {
            new_dates_disabled[date_disabled.date] = {disabled: true, disableTouchEvent: true};
        });

        var min = moment().startOf('month').format('YYYY-MM-DD');
        var max = moment().endOf('month').format('YYYY-MM-DD');

        const data = {
            range_date : {
                min,
                max,
            },
            dates_disabled: new_dates_disabled,
        }
        
        return res.status(200).json(data);
    },

    async getTimes(req, res) {
        const { date_selected } = req.params;

        const times = await time.findAll();

        const times_disabled = await time_date_disabled.findAll({ 
            where: { date: date_selected },
            include: [ time ]
        });

        const times_busy = await reservation_time.findAll({ 
            include: [ 
                {
                    model: reservation,
                    required: true,
                    where: {
                        date: date_selected
                    }
                }, 
                time 
            ]
        });

        var new_times = [];
        var new_times_disabled = [];
        var new_times_busy = [];

        times.map(time_ => {
            var time_formated = moment(time_.time, ['HH:mm']).format('hh:mm A');
            new_times.push({
                id: time_.id,
                name: time_formated,
            });
        });

        times_disabled.map(time_ => {
            var time_formated = moment(time_.time.time, ['HH:mm']).format('hh:mm A');
            new_times_disabled.push(time_formated);
        });

        times_busy.map(time_ => {
            var time_formated = moment(time_.time.time, ['HH:mm']).format('hh:mm A');
            new_times_busy.push({
                id: time_.id,
                name: time_formated,
            });
        });

        const data = {
            times: new_times,
            timesBusy: new_times_busy,
        }
        
        return res.status(200).json(data);
    },
};