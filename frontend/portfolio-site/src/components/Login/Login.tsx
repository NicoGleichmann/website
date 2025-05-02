// Login.tsx
import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logImg from './log.svg';
import registerImg from './register.svg';

const Login: React.FC = () => {
  useEffect(() => {
    const sign_in_btn = document.querySelector('#sign-in-btn');
    const sign_up_btn = document.querySelector('#sign-up-btn');
    const container = document.querySelector(`.${styles.container}`);

    if (sign_up_btn && container && sign_in_btn) {
      sign_up_btn.addEventListener('click', () => {
        container.classList.add(styles['sign-up-mode']);
      });

      sign_in_btn.addEventListener('click', () => {
        container.classList.remove(styles['sign-up-mode']);
      });
    }

    return () => {
      sign_up_btn?.removeEventListener('click', () => {});
      sign_in_btn?.removeEventListener('click', () => {});
    };
  }, []);

  // Login state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register state
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      }),
    });
    const data = await res.json();
    alert(data.message);
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className={styles.container}>
      <div className={styles['forms-container']}>
        <div className={styles['signin-signup']}>
          <form className={styles['sign-in-form']} onSubmit={handleLogin}>
            <h2 className={styles.title}>Sign in</h2>
            <div className={styles['input-field']}>
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" onChange={(e) => setLoginUsername(e.target.value)} />
            </div>
            <div className={styles['input-field']}>
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)} />
            </div>
            <input type="submit" value="Login" className={`${styles.btn} ${styles.solid}`} />
            <p className={styles['social-text']}>Or Sign in with social platforms</p>
            <div className={styles['social-media']}>
              <a href="#" className={styles['social-icon']}><i className="fab fa-facebook-f"></i></a>
              <a href="#" className={styles['social-icon']}><i className="fab fa-twitter"></i></a>
              <a href="#" className={styles['social-icon']}><i className="fab fa-google"></i></a>
              <a href="#" className={styles['social-icon']}><i className="fab fa-linkedin-in"></i></a>
            </div>
          </form>

          <form className={styles['sign-up-form']} onSubmit={handleRegister}>
            <h2 className={styles.title}>Sign up</h2>
            <div className={styles['input-field']}>
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)}/>
            </div>
            <div className={styles['input-field']}>
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)}/>
            </div>
            <div className={styles['input-field']}>
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)}/>
            </div>
            <input type="submit" className={styles.btn} value="Sign up" />
            <p className={styles['social-text']}>Or Sign up with social platforms</p>
            <div className={styles['social-media']}>
              <a href="#" className={styles['social-icon']}><i className="fab fa-facebook-f"></i></a>
              <a href="#" className={styles['social-icon']}><i className="fab fa-twitter"></i></a>
              <a href="#" className={styles['social-icon']}><i className="fab fa-google"></i></a>
              <a href="#" className={styles['social-icon']}><i className="fab fa-linkedin-in"></i></a>
            </div>
          </form>
        </div>
      </div>

      <div className={styles['panels-container']}>
        <div className={`${styles.panel} ${styles['left-panel']}`}>
          <div className={styles.content}>
            <h3>New here?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!</p>
            <button className={`${styles.btn} ${styles.transparent}`} id="sign-up-btn">Sign up</button>
          </div>
          <img src={logImg} className={styles.image} alt="Log in illustration" />
        </div>
        <div className={`${styles.panel} ${styles['right-panel']}`}>
          <div className={styles.content}>
            <h3>One of us?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.</p>
            <button className={`${styles.btn} ${styles.transparent}`} id="sign-in-btn">Sign in</button>
          </div>
          <img src={registerImg} className={styles.image} alt="Register illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
