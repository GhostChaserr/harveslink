import { Text, rem, Box, useMantineTheme, Button, Flex } from '@mantine/core';
import { IconUpload, IconX, IconVideo, IconTrash } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, FileWithPath } from '@mantine/dropzone';
import { FC, useState } from 'react';

export interface FileUploadProps extends DropzoneProps {
  onSave: (file: FileWithPath) => void;
}

const FileUpload: FC<Partial<FileUploadProps>> = (props) => {
  const [filePicked, setFilePicked] = useState<boolean>(false);
  const [file, setFile] = useState<FileWithPath | null>(null);
  const theme = useMantineTheme();

  const onFilePicked = (files: FileWithPath[]) => {
    setFilePicked(true);
    setFile(files[0]);
  };

  return (
    <Dropzone
      disabled={filePicked}
      onDrop={(files) => onFilePicked(files)}
      onReject={(files) => console.log('rejected files', files)}
      {...props}
    >
      <Flex direction={'column'} align="center" justify={'center'} mih={220}>
        <Flex justify={'center'} gap={'xl'} style={{ pointerEvents: 'none' }}>
          <Box>
            <Dropzone.Accept>
              <IconUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: 'var(--mantine-color-blue-6)',
                }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: 'var(--mantine-color-red-6)',
                }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconVideo
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: 'var(--mantine-color-dimmed)',
                }}
                stroke={1.5}
              />
            </Dropzone.Idle>
          </Box>

          <Box>
            <Text fw="bold" c={theme.colors.secondary[11]} size="xl" inline>
              ვიდეო ჩანაწერის ატვირთვა
            </Text>
            <Text c={theme.colors.secondary[11]} size="sm" inline mt={7}>
              ვიდეო ჩანაწერი არ უნდა აღემატებოდეს 40მბ ს
            </Text>
          </Box>
        </Flex>
        {filePicked && (
          <>
            <Button
              variant="outline"
              onClick={() => {
                setFile(null);
                setFilePicked(false);
              }}
              mt={'md'}
              leftSection={<IconTrash />}
            >
              წაშლა და ახლიდან ატვირთვა
            </Button>
            <Button mt={'md'}>შენახვა და გაგრძელება</Button>
          </>
        )}
        {!filePicked && (
          <Button mt={'md'} leftSection={<IconUpload />}>
            ფაილის მიბმა
          </Button>
        )}

        {filePicked && (
          <>
            <Text c={theme.colors.secondary[11]} size="sm" inline mt={'md'}>
              ფაილი წარმატებით აიტვირთა
            </Text>
            <Text c={theme.colors.secondary[11]} size="sm" inline mt={'md'}>
              {file?.name}
            </Text>
          </>
        )}
      </Flex>
    </Dropzone>
  );
};

export default FileUpload;
