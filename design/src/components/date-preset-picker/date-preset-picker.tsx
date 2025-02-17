import { Flex, Button, SimpleGrid } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import dayjs, { Dayjs } from 'dayjs';
import { FC } from 'react';
import { isMobile } from 'react-device-detect';

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

type DatePresetPickerProps = {
  loading: boolean;
  selectedDates: Dayjs[];
  setSelectedDates: (dates: Dayjs[]) => void;
  onThisMonthClick: () => void;
  onYesterdayClick: () => void;
  onTodayClick: () => void;
};

const DatePresetPicker: FC<DatePresetPickerProps> = ({
  onThisMonthClick,
  onTodayClick,
  onYesterdayClick,
  selectedDates,
  loading,
  setSelectedDates,
}) => {
  if (isMobile)
    return (
      <SimpleGrid mt={'sm'} cols={1}>
        <Button
          loading={loading}
          fw={'lighter'}
          h={32}
          fz={12}
          onClick={onTodayClick}
          size="md"
          fullWidth={isMobile ? true : false}
          variant="default"
        >
          დღეს
        </Button>
        <Button
          loading={loading}
          fw={'lighter'}
          h={32}
          fz={12}
          size="md"
          onClick={onYesterdayClick}
          variant="default"
          fullWidth={isMobile ? true : false}
        >
          გუშინ
        </Button>
        <DatePickerInput
          m={0}
          w={'100%'}
          variant="default"
          valueFormat={'YYYY-MM-DD'}
          p={0}
          leftSection={<IconCalendar size={18} stroke={1.5} />}
          numberOfColumns={isMobile ? 1 : 3}
          size="sm"
          c="dimmed"
          defaultValue={[
            new Date(selectedDates[0].format(DATE_FORMAT)),
            new Date(selectedDates[1].format(DATE_FORMAT)),
          ]}
          type="range"
          clearable
          onChange={(values) => {
            const start = values[0];
            const end = values[1];
            if (!start || !end) {
              setSelectedDates([
                dayjs().startOf('month'),
                dayjs().endOf('month'),
              ]);
            }
            if (start && end) {
              setSelectedDates([dayjs(start), dayjs(end)]);
            }
            return;
          }}
        />
      </SimpleGrid>
    );

  return (
    <Flex gap={'sm'} align={'center'}>
      <Button
        loading={loading}
        fw={'lighter'}
        size="sm"
        onClick={onYesterdayClick}
        variant="default"
      >
        გუშინ
      </Button>
      <Button
        loading={loading}
        fw={'lighter'}
        onClick={onTodayClick}
        size="sm"
        variant="default"
      >
        დღეს
      </Button>
      <DatePickerInput
        m={0}
        w={300}
        variant="default"
        valueFormat={'YYYY-MM-DD'}
        p={0}
        leftSection={<IconCalendar size={18} stroke={1.5} />}
        numberOfColumns={3}
        size="sm"
        c="dimmed"
        defaultValue={[
          new Date(selectedDates[0].format(DATE_FORMAT)),
          new Date(selectedDates[1].format(DATE_FORMAT)),
        ]}
        type="range"
        clearable
        onChange={(values) => {
          const start = values[0];
          const end = values[1];
          if (!start || !end) {
            setSelectedDates([
              dayjs().startOf('month'),
              dayjs().endOf('month'),
            ]);
          }
          if (start && end) {
            setSelectedDates([dayjs(start), dayjs(end)]);
          }
          return;
        }}
      />
    </Flex>
  );
};

export default DatePresetPicker;
