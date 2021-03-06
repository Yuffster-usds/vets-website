import PropTypes from 'prop-types';
import React from 'react';
import { SMALL_SCREEN_WIDTH } from '../constants';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.dropdownId = `${this.props.name}-dropdown`;
  }

  handleFocus = () => {
    const field = document.getElementById(this.dropdownId);
    if (field && window.innerWidth <= SMALL_SCREEN_WIDTH) {
      field.scrollIntoView();
    }
  };

  render() {
    if (!this.props.visible) {
      return null;
    }
    const hideArrowsClass = this.props.hideArrows ? 'hide-arrows' : '';
    return (
      <div className={this.props.className} id={this.dropdownId}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <select
          className={hideArrowsClass}
          id={this.props.name}
          name={this.props.name}
          alt={this.props.alt}
          value={this.props.value}
          onChange={this.props.onChange}
          onFocus={this.handleFocus}
        >
          {this.props.options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

Dropdown.propTypes = {
  visible: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Dropdown.defaultProps = {
  className: 'form-group top-aligned',
  visible: false,
};

export default Dropdown;
