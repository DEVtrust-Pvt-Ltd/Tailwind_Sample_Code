import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
/* eslint-disable */
import styles from './index.module.css';
import ButtonOutline from '../../components/buttonOutline/buttonOutline';
import Button from '../../components/button/button';
import { ReactComponent as Graphics } from '../../assets/images/invitePage.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ApiService from '../../api';
import JsonApiService from '../../api/jsonContentType';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const schema = yup
  .object()
  .shape({
  })
  .required();

export default function InvitePage() {
  const { id } = useParams();
  const history = useHistory();
  const [successMsg, setSuccessMsg] = useState('');
  const [loader, setLoader] = useState(false);
  const [formFlag, setFormFlag] = useState('signup');
  const [formError, setFormError] = useState('');
  const [invite, setInvite] = useState('');
  const [code, setCode] = useState([]);
  const [disable, setDisable] = useState(true);
  const [mobile, setMobile] = useState('');

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(async () => {
    const resp = await ApiService.getOwnEventData(id);
    console.log(resp.data);

    console.log('data============>', resp?.data?.data?.event_data[0]);
    if (resp?.data?.data?.event_data[0]?.event_custom_price != null) {
      setInvite(resp?.data?.data?.event_data[0]?.event_custom_price);
    }
    if (resp?.data?.data?.event_data[0]?.fund_range != null) {
      setInvite(resp?.data?.data?.event_data[0]?.fund_range);
    }
    if (resp?.data?.data?.event_data[0]?.fund_range === 'Not Sure?') {
      setInvite(null);
    }

    const respo = await ApiService.getCountryCode();
    console.log(respo.data);
    setCode("+1");
  }, []);



  const onSubmit = async (data) => {
    console.log(data);
    if (data.mobile_no == '' && data.email == '') {
      setFormError('Please Enter E-mail Or Phone number.');
    }
    
    else {
      setFormError('');
      console.log(data);
      try {
        setLoader(true);

        let payload = {
          event_id: id,
          email: data.email,
          mobile_no: data.mobile_no,
          phonecode: "+1",
        };
        try {
          const res = await JsonApiService.inviteEventNew(payload);
          setSuccessMsg(res.data.message);
          console.log(res.data.message);
        } catch (err) {
          console.log(err.message);
        }

        setLoader(false);
      } catch (err) {
        setLoader(false);
      }
    }
  };

 function handleChange(event) {
    const phone = event.target.value;  
     setMobile(phone.replace(/[A-Za-z!\-?=@+`~;:._'"\[\]{}|#$%^&*()\\//]/g, ''));
  }
       

  return (
    <div className="pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="shadow-eventForm bg-white py-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 xl:grid-cols-2 xl:gap-y-10">
              <div className="px-4">
                <Graphics width="100%" />
              </div>
              <div className="pr-6 pl-6 xl:pr-24 xl:pl-0">
                <h1 className="text-ch1 text-headingBlack font-semibold mb-5">
                  <span className="text-primary"> Aim </span>High, Raise Easily!
                </h1>
                <p className="text-txt text-headingBlack text-justify">
                  
                  Not sure how many people to reach out to? Don't worry, we've
                  already done the math!
                  <br />
                  <br />
                  <ul style={{ listStyleType: 'disc', paddingLeft: '30px' }}>
                    <li>
                      The average participant earns $500 per event, with 50% of
                      proceeds going to your organization.
                    </li>
                    <li>
                      By our calculations, and based on your goal of $
                      {invite === null ? 'XXXX' : 2 * invite} selected via
                      wizard, you should target{' '}
                      {invite === null ? 'YY = XXXX/ZZZ' : (2 * invite) / 500}{' '}
                      participants.
                    </li>
                  </ul>
                  <br />{' '}
                  <p>
                    To further assist you and your team, on Aimly Concierge Team
                    member will be reaching out to you shortly! In the meantime,
                    get started by sharing your event with potential volunteers!
                  </p>
                  <br />
                  <p>
                    There are two ways to do this - copy your event link and
                    share it with your community, or invite specific people by
                    entering their phone numbers or emails into the fields
                    below.
                  </p>
                </p>
                <br />
                {formError && (
                  <p className="mt-2 text-textRed text-sm">{formError}</p>
                )}
               
              </div>
              <div className="flex justify-end	 items-center pl-6 pr-6 xl:pl-32 xl:pr-0">
                <p className={`${styles.labelText} text-headingBlack`}>
                  <span className="text-primary">Email</span> Invitation:
                </p>
              </div>
              <div className="pl-6 pr-6 xl:pl-8 xl:pr-24">
                <input
                  type="text"
                  name="email"
                  placeholder="Separate Email Addresses with Commas"
                  className={`${styles.input}`}
                  onClick={() => setSuccessMsg('')}
                  ref={register()}
                />
              </div>
              <div className="flex justify-end	items-center pl-6 pr-6 xl:pl-32 xl:pr-0">
                <p className={`${styles.labelText} text-headingBlack`}>
                  <span className="text-primary">SMS</span> Invitation:
                </p>
              </div>
              <div className="pl-6 pr-6 xl:pl-8 xl:pr-24" >
                <input
                  type="text"
                  name="mobile_no"
                  value={mobile}
                  placeholder="Include Country Codes, Separate with Commas"
                  className={`${styles.input}`}
                  onClick={() => setSuccessMsg('')}
                  ref={register}
                  onChange={handleChange}
                />
                
              </div>
              <div className="pl-32 pr-20">
               
              </div>
              <div className="pl-6 pr-6 xl:pl-8 xl:pr-24">
                <div className="w-8/12 pr-10">
                  {successMsg && (
                    <p className="mb-6 px-3 text-white bg-primary rounded text-sm">
                      {successMsg}
                    </p>
                  )}
                </div>
                <div className="grid gap-y-4 grid-cols-1 justify-between lg:flex">
                  <ButtonOutline
                    text={'Go to dashbord'}
                    eventClick={() => {
                      history.push('/dashboard');
                    }}
                   
                  />
                  <Button
                    type="button"
                    text={'Copy Event Link'}
                    eventClick={() => {
                      const host = window.location.host;
                      navigator.clipboard.writeText(`${host}/event/${id}`);
                      setSuccessMsg('Event copied successfully');
                    }}
                    
                  />
                  <ButtonOutline
                    text={'Send'}
                    type="submit"
                    loader={loader}
                    disabled={loader}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
