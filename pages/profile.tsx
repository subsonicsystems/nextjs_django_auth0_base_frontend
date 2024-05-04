import { useEffect, useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Snackbar,
  SnackbarProps,
  Typography,
} from '@mui/joy';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import Layout from '@/components/layout';
import { User } from '@/pages/api/getUser';

interface FormValues {
  name: string;
  email: string;
}

export default function Profile() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState<SnackbarProps['color']>();

  const {
    control, reset, handleSubmit, formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    axios
      .get<User>('/api/getUser')
      .then((res) => {
        reset({
          name: res.data.name,
          email: res.data.email,
        });
      })
      .catch(() => {
        setMessage('情報を取得できませんでした。');
        setSnackbarColor('danger');
        setOpenSnackbar(true);
      });
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    axios
      .patch('/api/profile', {
        name: data.name,
        email: data.email,
      })
      .then(() => {
        setMessage('プロフィールを更新しました。');
        setSnackbarColor('success');
        setOpenSnackbar(true);
      })
      .catch(() => {
        setMessage('プロフィールを更新できませんでした。');
        setSnackbarColor('danger');
        setOpenSnackbar(true);
      });
  };

  return (
    <Layout>
      <div>
        <Typography
          level="title-md"
          gutterBottom
        >
          プロフィール
        </Typography>
        <Box mt={2}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <FormControl error={errors.name !== undefined}>
                    <FormLabel>
                      氏名
                    </FormLabel>
                    <Input
                      {...field}
                      sx={{ width: 300 }}
                    />
                    <FormHelperText>
                      {errors.name?.message}
                    </FormHelperText>
                  </FormControl>
                )}
                rules={{
                  required: '氏名を入力してください',
                }}
              />
            </Box>
            <Box mt={2}>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <FormControl error={errors.email !== undefined}>
                    <FormLabel>
                      メールアドレス
                    </FormLabel>
                    <Input
                      {...field}
                      sx={{ width: 300 }}
                    />
                    <FormHelperText>
                      {errors.email?.message}
                    </FormHelperText>
                  </FormControl>
                )}
                rules={{
                  required: 'メールアドレスを入力してください',
                }}
              />
            </Box>
            <Box mt={2}>
              <Button type="submit">
                保存
              </Button>
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => {
                  setOpenSnackbar(false);
                }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                color={snackbarColor}
                variant="soft"
              >
                {message}
              </Snackbar>
            </Box>
          </form>
        </Box>
      </div>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired();
