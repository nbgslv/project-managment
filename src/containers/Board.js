import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withDataFetching from '../withDataFetching';
import Lane from '../components/Lane/Lane';

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

class Board extends Component {
  constructor() {
    super();
    this.state = {
      tickets: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (prevProps.data !== data) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ tickets: data });
    }
  }

  onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDrop = (e, laneId) => {
    const id = Number(e.dataTransfer.getData('id'));

    const tickets = this.state.tickets.filter(ticket => {
      if (ticket.id === id) ticket.lane = laneId;
      return ticket;
    });

    this.setState({
      ...this.state,
      tickets,
    });
  };

  render() {
    const { lanes, loading, error } = this.props;
    const { tickets } = this.state;

    return (
      <BoardWrapper>
        {lanes.map(lane => (
          <Lane
            key={lane.id}
            laneId={lane.id}
            title={lane.title}
            loading={loading}
            error={error}
            onDragStart={this.onDragStart}
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}
            tickets={tickets.filter(ticket => ticket.lane === lane.id)}
          />
        ))}
      </BoardWrapper>
    );
  }
}

Board.propTypes = {
  lanes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withDataFetching(Board);
