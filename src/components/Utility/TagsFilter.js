import Select from 'react-select';

const TagsFilter = ({ tags, setTags }) => {
  const options = [
    { value: '', label: 'Tags' },
    { value: 'Quick Snack', label: 'Quick Snack' },
    { value: 'Soup', label: 'Soup' },
    { value: 'BBQ', label: 'BBQ' },
    { value: 'Salad', label: 'Salad' },
    { value: 'Fancy', label: 'Fancy' },
    { value: 'Fast Food', label: 'Fast Food' },
    { value: 'Dessert', label: 'Dessert' },
    { value: 'Vegan', label: 'Vegan' },
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
    <div >
<Select
  isMulti
  options={options}
  value={options.filter(option => tags.includes(option.value))}
  onChange={(selectedOptions) => {
    setTags(selectedOptions ? selectedOptions.map(opt => opt.value) : []);
  }}
  styles={customStyles}
  placeholder="Tags"
  isClearable
/>

    </div>
  );
};

export default TagsFilter;
