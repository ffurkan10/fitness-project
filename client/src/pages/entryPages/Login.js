import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/auth/AuthSlice';
import InputMail from '../../components/ui/inputs/InputMail';
import InputPassword from '../../components/ui/inputs/InputPassword';
import Button from '../../components/ui/buttons/Button';
import fitness from '../../assets/png/fitness-bg.jpg';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [isShow, setIsShow] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  const showPassword = () => {
    setIsShow(!isShow);
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(data));
  }

  return (
    <div className='flex items-center h-screen'>
      <div className='w-1/2 h-screen '>
        <img src={fitness} alt="fitness" className="w-full object-cover h-full" />
      </div>
      <div className="flex items-center justify-center h-screen w-1/2">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold text-dark mb-6 text-center">Giriş Yap</h2>
          <form onSubmit={(e) => handleLogin(e)}>
            <div className="mb-4">
              <InputMail data={data.email} setData={(e) => handleChange(e)} name={"email"} labelText={"E-Mail"} width={"100%"} />
            </div>
            <div className="mb-6">
              <InputPassword data={data.password} setData={(e) => handleChange(e)} name={"password"} labelText={"Şifre"} width={"100%"} isShow={isShow} showPassword={showPassword} type={isShow ? "text" : "password"} />
            </div>
            <Button text={"Giriş Yap"} handleClick={handleLogin} width={"100%"} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login