import React from 'react';
import { calculateRating, roundRating } from '../utils/helpers';
import '../sass/disability-calculator.scss';
import { CalculatedDisabilityRating } from './CalculatedDisabilityRating';

export default class DisabilityRatingCalculator extends React.Component {
  constructor() {
    super();
    this.state = {
      ratings: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRatingCalculateChange = this.handleRatingCalculateChange.bind(
      this,
    );
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleAddRating = this.handleAddRating.bind(this);
    this.handleRemoveRating = this.handleRemoveRating.bind(this);
  }

  handleRatingChange = evt => {
    this.setState({ rating: parseInt(evt.target.value) });
  };

  handleRatingCalculateChange = idx => evt => {
    const newRatings = this.state.ratings.map((rating, sidx) => {
      if (idx !== sidx) return parseInt(rating);
      return parseInt(evt.target.value);
    });

    this.setState({ ratings: newRatings });
  };

  handleSubmit = evt => {
    const { ratings } = this.state;
    console.log('Your VA disability rating is ', calculateRating(ratings), '%');
    alert(`Your VA disability rating is ${calculateRating(ratings)} %`);
    // return calculateRating(ratings);
  };


  handleAddRating = () => {
    console.log(this.state.ratings);
    this.setState({ ratings: [...this.state.ratings, parseInt('')] });
  };

  handleRemoveRating = idx => () => {
    this.setState({
      ratings: this.state.ratings.filter((s, sidx) => idx !== sidx),
    });
  };

  clearAll = () => {
    // const ratingInputs = document.getElementsByClassName('ratingInput');
    // const descriptionInputs = document.getElementsByClassName(
    //   'descriptionInput',
    // );
    // for (let i = 0; i < ratingInputs.length; i++) {
    //   ratingInputs[i].value = '';
    //   descriptionInputs[i].value = '';
    // }
    this.setState({
      ratings: []
    })
  };

  render() {

    return (
      <div className="disability-calculator">
        <div className="calc-header vads-u-padding-x--4">
          <h2 className="vads-u-padding-top--4">
            VA disability rating calculator
          </h2>
          <p>
            Use our calculator if you have more than one disability rating to
            determine your VA comined disability rating
          </p>
        </div>
        <div className="vads-l-grid-container">
          <div className="vads-l-row">
            <div className="vads-l-col--3 vads-u-padding-right--2">
              Disability rating
            </div>
            <div className="vads-l-col--8">Optional description</div>
          </div>

          {this.state.ratings.map((rating, idx) => (
            <div className="rating vads-l-row" key={idx}>
              <div className="vads-l-col--2 vads-u-padding-right--2">
                <input
                  type="text"
                  min="0"
                  value={this.state.ratings.value}
                  onChange={this.handleRatingCalculateChange(idx)}
                  className="ratingInput"
                  maxLength="3"
                  min="1"
                  max="100"
                />
              </div>
              <div className="vads-l-col--8">
                <input className="descriptionInput" />
              </div>
              <div className="vads-l-col--2">
                <button type="button" onClick={this.handleRemoveRating(idx)}>
                  <i className="fas fa-trash-alt" />
                </button>
                <a onClick={this.handleRemoveRating(idx)}>Delete</a>
              </div>
            </div>
          ))}
          <div className="vads-l-grid-container">
            <div className="vads-l-row">
              <div className="vads-l-col--3">
                <button type="button" onClick={this.handleAddRating}>
                  <i className="fas fa-plus-circle" />
                </button>
                <a onClick={this.handleAddRating}>Add rating</a>
              </div>
              <div className="vads-l-col--8" />
            </div>
            <div className="vads-l-row">
              <div className="vads-l-col--3 vads-u-padding-right--2">
                <button
                  onClick={evt => {
                    this.handleSubmit(evt);
                  }}
                >
                  Calculate
                </button>
              </div>
              <div className="vads-l-col--8">
                <a onClick={this.clearAll}>Clear all</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
