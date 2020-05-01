import React from 'react';
import PropTypes from 'prop-types';

export default function withDataFetching(WrappedComponent) {
  class WithDataFetching extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        loading: true,
        error: '',
      };
    }

    async componentDidMount() {
      const { dataSource } = this.props;
      try {
        const data = await fetch(dataSource);
        const dataJSON = await data.json();

        if (dataJSON) {
          this.setState({
            data: dataJSON,
            loading: false,
          });
        }
      } catch (error) {
        this.setState({
          loading: false,
          error: error.message,
        });
      }
    }

    render() {
      const { data, loading, error } = this.state;

      return <WrappedComponent data={data} loading={loading} error={error} {...this.props} />;
    }
  }

  WithDataFetching.displayName = `withDataFetching(${WrappedComponent.name})`;

  return WithDataFetching;
}

withDataFetching.propTypes = {
  dataSource: PropTypes.string.isRequired,
};
