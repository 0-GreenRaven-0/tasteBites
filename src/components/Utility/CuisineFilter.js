import Select from 'react-select';
import './FiltersCss.css'

const CuisineFilter = ({ cuisine, setCuisine }) => {
  const options = [
    { value: 'italian', label: 'Italian' },
    { value: 'french', label: 'French' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'indian', label: 'Indian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'thai', label: 'Thai' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'american', label: 'American' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'greek', label: 'Greek' },
    { value: 'vietnamese', label: 'Vietnamese' },
    { value: 'korean', label: 'Korean' },
    { value: 'turkish', label: 'Turkish' },
    { value: 'moroccan', label: 'Moroccan' },
    { value: 'caribbean', label: 'Caribbean' },
    { value: 'german', label: 'German' },
    { value: 'brazilian', label: 'Brazilian' },
    { value: 'ethiopian', label: 'Ethiopian' },
    { value: 'lebanese', label: 'Lebanese' },
  ];


  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'orange',
      borderColor: state.isFocused ? 'yellow' : 'orange',
      boxShadow: state.isFocused ? '0 0 0 1px yellow' : 'none',
      '&:hover': {
        borderColor: 'yellow',
      },
      color: 'black',
    }),
    singleValue: (base) => ({
      ...base,
      color: 'black',
    }),
    placeholder: (base) => ({
      ...base,
      color: 'black',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'orange',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? 'yellow' : 'orange',
      color: 'black',
      '&:hover': {
        backgroundColor: 'yellow',
      },
    }),
  }
  

  return (
    <div className="filter">
      <Select
        options={options}
        value={options.find(option => option.value === cuisine)}
        onChange={(selected) => setCuisine(selected?.value || '')}
        styles={customStyles}
        placeholder="Cuisine"
        isClearable
      />
    </div>
  );
};

export default CuisineFilter;
