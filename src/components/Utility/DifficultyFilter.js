import React from 'react'
import Select from 'react-select'

const options = [
  { value: ' ', label: 'Difficulty' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
  { value: 'expert', label: 'Expert' },
  { value: 'Master', label: 'Master' },
]

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

const DifficultyFilter = ({ difficulty, setDifficulty }) => {
  const selectedOption = options.find(opt => opt.value === difficulty)

  return (
    <div>
      <Select
        options={options}
        value={selectedOption}
        onChange={selected => setDifficulty(selected.value)}
        styles={customStyles}
        placeholder="Difficulty"
        isSearchable={false}
      />
    </div>
  )
}

export default DifficultyFilter
