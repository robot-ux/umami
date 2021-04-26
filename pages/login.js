import React from 'react';
import Layout from 'components/layout/Layout';
import Button from 'components/common/Button';

export default function LoginPage() {
  // const handleLogin = React.useCallback(() => {
  //   fetch(`/api/auth/okta`);
  // }, []);

  return (
    <Layout title="login" header={false} footer={false} center>
      <Button
        style={{
          width: 'auto',
          margin: '200px auto',
        }}
        type="submit"
        variant="action"
        onClick={() => (location.href = '/api/auth/okta')}
      >
        Login With Okta
      </Button>
    </Layout>
  );
}
