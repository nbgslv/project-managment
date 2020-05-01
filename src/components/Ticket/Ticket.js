import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TicketWrapper = styled.div`
  background: darkgray;
  padding: 20px;
  margin: ${props => (props.margin ? '5%' : '1%')};
  border-radius: 20px;

  &:not(:last-child) {
    margin-bottom: 5%;
  }
`;

const Title = styled.h3`
  width: 100%;
  margin: 0;
`;

const Body = styled.p`
  width: 100%;
`;

const Ticket = ({ ticket, onDragStart, margin }) => (
  <TicketWrapper draggable onDragStart={e => onDragStart(e, ticket.id)} margin={margin}>
    <Title>{ticket.title}</Title>
    <Body>{ticket.body}</Body>
  </TicketWrapper>
);

Ticket.propTypes = {
  ticket: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  onDragStart: PropTypes.func.isRequired,
  margin: PropTypes.bool,
};

Ticket.defaultProps = {
  margin: false,
}

export default Ticket;
