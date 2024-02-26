import { MenuItem, Select } from '@material-ui/core';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import DownIcon from '../../assets/svg/Down.svg';

const StyledSelect = styled((props) => (
  <Select
    {...props}
    IconComponent={DownIcon}
    MenuProps={{
      style: {
        marginTop: '30px',
        marginLeft: '-60px',
      },
    }}
  />
))({
  '.MuiSelect-root': {
    fontSize: '12px',
    marginLeft: '5px',
    color: '#677897',
  },
  '.MuiOutlinedInput-input': {
    padding: '0',
    paddingRight: '30px',
  },
  '.MuiSelect-icon ': {
    marginTop: '8px',
  },

  '.MuiOutlinedInput-notchedOutline': {
    borderRadius: '0px 2px 2px 0px',
    border: 'none',
    display: 'none',
  },
  '& .MuiTabs-indicatorSpan': {
    width: 3,
    backgroundColor: '#0075ff',
  },
});

const StyledMenuItem = styled((props) => (
  <MenuItem {...props}>{props.children}</MenuItem>
))({
  fontFamily: 'Montserrat, serif',
  fontSize: '12px',
  color: '#47536A',
  padding: '12px 16px',
  display: 'flex',
  minWidth: '206px',
  justifyContent: 'center',
  '&: hover': {
    background: '#EAF1FC',
  },
  '&.Mui-selected': {
    background: '#FFF',
    fontWeight: '600',
    '&: hover': {
      background: '#EAF1FC',
    },
  },
  '.MuiOutlinedInput-input': {
    padding: '0',
    paddingRight: '30px',
  },

  '.MuiOutlinedInput-notchedOutline': {
    borderRadius: '0px 2px 2px 0px',
    border: 'none',
  },
  '& .MuiTabs-indicatorSpan': {
    width: 3,
    backgroundColor: '#0075ff',
  },
});

const FilterSelect = ({ value, handleChange, options, label }) => {
  return (
    <div style={{ marginTop: '25px' }}>
      <span
        style={{
          fontSize: '12px',
          fontWeight: 700,
          marginLeft: '15px',
          color: '#677897',
        }}
      >
        {label}
      </span>
      <StyledSelect
        labelId="filter-select-label"
        id="filter-select"
        value={value}
        label={label}
        onChange={handleChange}
        variant="outlined"
        inputProps={{
          name: 'age',
          id: 'uncontrolled-native',
        }}
      >
        {options.map((option) => (
          <StyledMenuItem key={option.value} value={option.value}>
            {option.label}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </div>
  );
};

FilterSelect.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  label: PropTypes.string,
};

export default FilterSelect;
