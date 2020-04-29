import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likeChampion, unlikeChampion } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedChampion = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.championId === this.props.championId
      )
    )
      return true;
    else return false;
  };
  likeChampion = () => {
    this.props.likeChampion(this.props.championId);
  };
  unlikeChampion = () => {
    this.props.unlikeChampion(this.props.championId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedChampion() ? (
      <MyButton tip="Undo like" onClick={this.unlikeChampion}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeChampion}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  championId: PropTypes.string.isRequired,
  likeChampion: PropTypes.func.isRequired,
  unlikeChampion: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeChampion,
  unlikeChampion
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
