import React from 'react';
import CreateYourEvent from '../../assets/images/CreateYourEvent.svg';
import GatherVolunteers from '../../assets/images/GatherVolunteers.svg';
import GearUpforStartDay from '../../assets/images/GearUpforStartDay.svg';
import StartFundraising from '../../assets/images/StartFundraising.svg';
import ReceivingYourFunds from '../../assets/images/ReceivingYourFunds.svg';
import GearsforStartDay from '../../assets/images/GearsforStartDay.svg';
import AcceptYourInvitation from '../../assets/images/AcceptYourInvitation.svg';
import EncourageSupport from '../../assets/images/EncourageSupport.svg';

/* eslint-disable */

const Tabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-0.3 flex-row"
            role="tablist"
          >
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <a
                className={
                  'text-lg w-2/6 float-right create-your-ent font-semibold px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 1
                    ? 'text-primary bg-' + color + '-600'
                    : 'text-' + color + '-600 bg-white w-1/2 tbs-colr')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                For Organizers
              </a>
            </li>
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <a
                className={
                  'text-lg w-2/6 font-semibold create-your-ent px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 2
                    ? 'text-primary bg-' + color + '-600'
                    : 'text-' + color + '-600 bg-white w-1/2 tbs-colr')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                For Volunteers
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-16 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto create-your-ent">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
                  <div class="grid grid-cols-3 gap-4 pt-8 pb-8">
                    <div class="justify-center flex">
                      <img src={CreateYourEvent} className="w-32 h-32 m-auto" />
                    </div>
                    <div class="col-span-2 pr-80">
                      <h2 className="-ml-4">
                        <span className="text-primary tab-head-font font-semibold text-txtFund">
                          1. Create Your Event
                        </span>
                      </h2>
                      <p className="font-normal tip-seize paracolor">
                        Using Aimly's simple step-by-step process, create a
                        beatiful event page for your organization - describe
                        your event, include compelling imagery, set your event
                        goal, and choose a start date!
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-4 pb-8">
                    <div class="justify-center flex">
                      <img
                        src={GatherVolunteers}
                        className="w-32 h-32 m-auto"
                      />
                    </div>
                    <div class="col-span-2 pr-80">
                      <h2 className="-ml-4">
                        <span className="text-primary tab-head-font font-semibold text-txtFund">
                          2. Gather Volunteers
                        </span>
                      </h2>
                      <p className="font-normal tip-seize paracolor">
                        It takes a village - invite yours by email, text
                        message, or by copying your event page link. Your
                        volunteers will be able to create a supporting event
                        page that allows them to spread the word about your
                        cause to their own social network!
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-4 pb-8">
                    <div class="justify-center flex">
                      <img
                        src={GearUpforStartDay}
                        className="w-32 h-32 m-auto"
                      />
                    </div>
                    <div class="col-span-2 pr-80">
                      <h2 className="-ml-4">
                        <span className="text-primary tab-head-font font-semibold text-txtFund">
                          3. Gear Up for Start Day
                        </span>
                      </h2>
                      <p className="font-normal tip-seize paracolor">
                        As your event start date approaches, make sure that your
                        event page is looking good, and reach out to your
                        volunteers to ensure they've got everything they need.
                        It's almost go time!
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-4 pb-8">
                    <div class="justify-center flex">
                      <img
                        src={StartFundraising}
                        className="w-32 h-32 m-auto"
                      />
                    </div>
                    <div class="col-span-2 pr-80">
                      <h2 className="-ml-4">
                        <span className="text-primary tab-head-font font-semibold text-txtFund">
                          4. Start Fundraising!
                        </span>
                      </h2>
                      <p className="font-normal tip-seize paracolor">
                        Supporters are able to donate directly to your event, or
                        through a purchase of our delicious chips. Use those
                        leaderboards to create even more hype!
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-4 pb-8">
                    <div class="justify-center flex">
                      <img
                        src={ReceivingYourFunds}
                        className="w-32 h-32 m-auto"
                      />
                    </div>
                    <div class="col-span-2 pr-80">
                      <h2 className="-ml-4">
                        <span className="text-primary tab-head-font font-semibold text-txtFund">
                          5. Receiving Your Funds
                        </span>
                      </h2>
                      <p className="font-normal tip-seize paracolor text-lg">
                        After 7 days, your event will end. Keep in mind that
                        Aimly automatically doubles your event goal to account
                        for the 50% of volunteer contributions that will go to
                        your event. Be sure to add your bank account to your
                        Aimly profile so that you'll receive your funds after
                        your event!
                      </p>
                    </div>
                  </div>
                </div>
                <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
                  <div class="grid grid-cols-3 gap-4 pt-8 pb-8">
                    <div class="justify-center flex">
                      <img
                        src={AcceptYourInvitation}
                        className="w-32 h-32 m-auto"
                      />
                    </div>
                    <div class="col-span-2 pr-80">
                      <h2 className="-ml-4 mb-3">
                        <span className="text-primary font-semibold tab-head-font text-txtFund">
                          1. Accept Your Invitation
                        </span>
                      </h2>
                      <p className="font-normal tip-seize paracolor">
                        Once you've been invited as a volunteer, you'll receive
                        an email, text message, or link. Click `Accept` on the
                        invitation page and get started creating your support
                        page!{' '}
                        <strong className="paracolor tip-seize">Tip:</strong>{' '}
                        Using your own imagery and social media links means the
                        event will be seen by even more people!
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-4 pb-8">
                    <div class="justify-center flex">
                      <img
                        src={GearsforStartDay}
                        className="w-32 h-32 m-auto"
                      />
                    </div>
                    <div class="col-span-2 pr-80">
                      <h2 className="-ml-4 mb-3">
                        <span className="text-primary tab-head-font font-semibold text-txtFund">
                          2. Gear Up for Start Day
                        </span>
                      </h2>
                      <p className="font-normal text-lg lats-tabs-para paracolor">
                        As the event start approaches, get ready to start
                        posting! Your role as a volunteer is essential to the
                        Aimly fundraising process.
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-4 pb-8">
                    <div class="justify-center flex">
                      <img
                        src={EncourageSupport}
                        className="w-32 h-32 m-auto"
                      />
                    </div>
                    <div class="col-span-2 pr-80">
                      <h2 className="-ml-4 mb-3">
                        <span className="text-primary tab-head-font font-semibold text-txtFund">
                          3. Encourage Others to Support
                        </span>
                      </h2>
                      <p className="font-normal lats-tabs-para">
                        Supporters are able to donate to your event through
                        purchases of our delicious chips, or through direct
                        donation. Encourage your social network, family, and
                        friends to get out there and get supporting!
                        <br /> <br />{' '}
                        <span className="text-primary font-normal text-txtFund">
                          Keep an eye on those leaderboards!
                        </span>{' '}
                        Nothing feels better than seeing your hard work pay off
                        with a victory! Event pages will have leaderboards that
                        show just how much of a difference you've made as a
                        volunteer!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function HowItWorks() {
  return (
    <div className="container mx-auto pt-6 aboutBannerTop ">
      <div className="bg-white about-us-bg-Banner mt-24">
        <div className="m-4 grid-cols-3 ">
          <h2 className="font-semibold mb-5 text-center how-works-tabs">
            How It Works
          </h2>
          <Tabs color="teal" />
        </div>
      </div>
    </div>
  );
}
