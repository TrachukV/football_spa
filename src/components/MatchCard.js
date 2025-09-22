import React from 'react';
import { Link } from 'react-router-dom';
import dateIcon from '../assets/date.png';
import ballIcon from '../assets/ball.svg';

const MatchCard = ({ match, id }) => {
  const [homeTeam, awayTeam] = match.title.split(' - ');
  
  const dateObj = new Date(match.date);


const time = dateObj.toLocaleTimeString('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
});


const datePart = dateObj.toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

const formattedDate = `${time}, ${datePart}`;


  return (
    <Link to={`/match/${id}`} state={{ match }} className="match-card__link">
      <div className="match-card">
        <p className="match-card__competition">{match.competition}</p>

        <div className="match-card__teams">
          <span className="team home">
            <img src={ballIcon} alt="home" className="team-icon home-icon" />
            {homeTeam}
          </span>
          <span className="vs">vs</span>
          <span className="team away">
            <img src={ballIcon} alt="away" className="team-icon away-icon" />
            {awayTeam}
          </span>
        </div>

        <div className="match-card__date-row">
          <img src={dateIcon} alt="date" className="date-icon" />
          <span className="match-card__date">{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
};

export default MatchCard;
