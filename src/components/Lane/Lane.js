import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Ticket from '../Ticket/Ticket';

const LaneWrapper = styled.div`
  list-style: none;
  text-align: left;
  padding: 0;
  background: lightGray;
  border-radius: 20px;
  min-height: 50vh;
  width: 20vw;

  @media (max-width: 768px) {
    margin-bottom: 5%;
  }
`;

const Title = styled.h2`
  width: 100%;
  padding-bottom: 10px;
  text-align: center;
  border-bottom: 1px solid darkGray;
`;

const TicketWrapper = styled.div`
  text-align: center;
`;

const Alert = styled.div`
  text-align: center;
`;

const Lane = ({ laneId, tickets, loading, error, onDragStart, onDragOver, onDrop, title }) => (
  <LaneWrapper onDragOver={onDragOver} onDrop={e => onDrop(e, laneId)}>
    <Title>{title}</Title>
    {loading || error ? (
      <Alert>{loading ? 'Loading...' : error}</Alert>
    ) : (
      <TicketWrapper>
        {tickets.map(ticket => (
          <Ticket key={ticket.id} margin ticket={ticket} onDragStart={onDragStart} />
        ))}
      </TicketWrapper>
    )}
  </LaneWrapper>
);

Lane.propTypes = {
  laneId: PropTypes.number.isRequired,
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      ticket: PropTypes.object.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Lane;
