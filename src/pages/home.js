import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Champion from '../components/champion/Champion';
import Profile from '../components/profile/Profile';
import ChampionSkeleton from '../util/ChampionSkeleton';

import { connect } from 'react-redux';
import { getChampions } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getChampions();
  }
  render() {
    const { champions, loading } = this.props.data;
    let recentChampionsMarkup = !loading ? (
      champions.map((champion) => <Champion key={champion.championId} champion={champion} />)
    ) : (
      <ChampionSkeleton />
    );
    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          {recentChampionsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getChampions: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getChampions }
)(home);
