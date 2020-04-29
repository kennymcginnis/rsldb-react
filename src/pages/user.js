import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Champion from '../components/champion/Champion';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import ChampionSkeleton from '../util/ChampionSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    championIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const championId = this.props.match.params.championId;

    if (championId) this.setState({ championIdParam: championId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { champions, loading } = this.props.data;
    const { championIdParam } = this.state;

    const championsMarkup = loading ? (
      <ChampionSkeleton />
    ) : champions === null ? (
      <p>No champions from this user</p>
    ) : !championIdParam ? (
      champions.map((champion) => <Champion key={champion.championId} champion={champion} />)
    ) : (
      champions.map((champion) => {
        if (champion.championId !== championIdParam)
          return <Champion key={champion.championId} champion={champion} />;
        else return <Champion key={champion.championId} champion={champion} openDialog />;
      })
    );

    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          {championsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);
