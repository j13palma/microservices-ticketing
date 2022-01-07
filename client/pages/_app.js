import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  const email = currentUser ? currentUser.email : null;
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className='container'>
        <h1>Howdy {email}</h1>
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  console.log('APP CONTEXT!');
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  console.log('PAGE PROPS', pageProps);

  return { pageProps, ...data };
};

export default AppComponent;
