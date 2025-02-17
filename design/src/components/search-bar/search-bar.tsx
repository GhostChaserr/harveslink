import { FC, useState } from 'react';
import { CloseButton, Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import { debounce } from 'lodash';
import { isMobile } from 'react-device-detect';

type SearchBarProps = {
  placeholder: string;
  search: string;
  autoFocus: boolean;
  onSearch: (search: string) => void;
  onClear: () => void;
};

const SearchBar: FC<SearchBarProps> = ({
  onSearch,
  placeholder,
  autoFocus,
  onClear,
  search,
}) => {
  const [query, setQuery] = useState('');

  // Debounce the onSearch function with a delay of 300 milliseconds
  const debouncedSearch = debounce((value: string) => {
    onSearch(value);
  }, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setQuery(value);
    // Call the debouncedSearch function with the current value after a delay
    debouncedSearch(value);
  };

  // useEffect(() => {
  //   if (search === 'empty') {
  //     setQuery('');
  //   }
  // }, [search]);

  return (
    <Input
      placeholder={placeholder}
      value={query}
      w={isMobile ? 'auto' : 800}
      autoFocus={autoFocus}
      size="lg"
      onChange={handleChange}
      rightSectionPointerEvents="all"
      leftSection={<IconSearch />}
      rightSection={
        <CloseButton
          onClick={() => {
            setQuery('');
            onClear();
          }}
        />
      }
      styles={{
        input: { border: 'none', color: 'gray' },
      }}
    />
  );
};

export default SearchBar;
