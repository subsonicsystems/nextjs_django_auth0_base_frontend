import { useContext, useEffect, useState } from 'react';
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
import { UserContext } from '@/pages/_app';

interface FormValues {
  last_name: string;
  first_name: string;
  email: string;
}

export default function Profile() {
  const { user, setUser } = useContext(UserContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState<SnackbarProps['color']>();

  const {
    control, reset, handleSubmit, formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      last_name: '',
      first_name: '',
      email: '',
    },
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    reset({
      last_name: user.last_name,
      first_name: user.first_name,
      email: user.email,
    });
  }, [user]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    axios
      .patch('/api/profile', {
        last_name: data.last_name,
        first_name: data.first_name,
        email: data.email,
      })
      .then(() => {
        setUser({
          last_name: data.last_name,
          first_name: data.first_name,
          email: data.email,
        });
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
                name="last_name"
                render={({ field }) => (
                  <FormControl error={errors.last_name !== undefined}>
                    <FormLabel>
                      姓
                    </FormLabel>
                    <Input
                      {...field}
                      sx={{ width: 300 }}
                    />
                    <FormHelperText>
                      {errors.last_name?.message}
                    </FormHelperText>
                  </FormControl>
                )}
                rules={{
                  required: '姓を入力してください',
                }}
              />
            </Box>
            <Box>
              <Controller
                control={control}
                name="first_name"
                render={({ field }) => (
                  <FormControl error={errors.first_name !== undefined}>
                    <FormLabel>
                      名
                    </FormLabel>
                    <Input
                      {...field}
                      sx={{ width: 300 }}
                    />
                    <FormHelperText>
                      {errors.first_name?.message}
                    </FormHelperText>
                  </FormControl>
                )}
                rules={{
                  required: '名を入力してください',
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
                onClose={() => setOpenSnackbar(false)}
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
