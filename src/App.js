import React, { useState } from 'react';
import './App.css';
import moment from 'moment';

function withDateTimePretty(WrappedComponent) {
  class DateTimePretty extends React.Component {
    state = {
      date: this.props.date,
    };

    beautifyDate(date) {
      let now = moment();
      var convertedDate = moment(date);
      let differenceTimeInSeconds = now.diff(convertedDate, 'seconds');

      if(differenceTimeInSeconds < 3601) {
        let differenceTimeInMinutes = Math.floor(differenceTimeInSeconds / 60);
        this.setState({date: differenceTimeInMinutes + ' минут назад'});
      }
      if(differenceTimeInSeconds > 3600 && differenceTimeInSeconds < 86401) {
        let differenceTimeInHours = Math.floor(differenceTimeInSeconds / 3600);
        this.setState({date: differenceTimeInHours + ' часов назад'});
      }

      if (differenceTimeInSeconds > 86400) {
        let differenceTimeInDays = Math.floor(differenceTimeInSeconds / 86400);
        this.setState({date: differenceTimeInDays + ' дней назад'});
      }
    }

    componentDidMount() {
      this.beautifyDate(this.state.date)
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }

  return DateTimePretty;
}

const DateTimePretty = withDateTimePretty(DateTime);

function DateTime(props) {
  return (
    <p className="date">{props.date}</p>
  )
}

function Video(props) {
  return (
    <div className="video">
      <iframe src={props.url} title={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
      <DateTimePretty date={props.date} />
    </div>
  )
}

function VideoList(props) {
  return props.list.map(item => <Video url={item.url} date={item.date}
    key={item.url.toString()}
  />);
}

export default function App() {
  const [list] = useState([
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2022-12-05 21:23:00'
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2022-12-05 20:23:00'
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2021-12-03 20:16:00'
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-03 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-01 16:17:00'
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-12-02 05:24:00'
    },
  ]);

  return (
    <VideoList list={list} />
  );
}

