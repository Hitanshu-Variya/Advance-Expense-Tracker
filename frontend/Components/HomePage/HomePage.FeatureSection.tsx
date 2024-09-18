import FeatureCard from '../HomePage/HomePage.FeatureSection.Card.tsx'

const FeaturesSection = () => {
  return (
    <section className="bg-black text-white py-12">
      <hr className='my-10 h-px w-full bg-slate-800 border-none shadow-lg shadow-white' />
      <div className="container mx-auto text-center">
        <div className='flex flex-col items-center'>
          <h2 className="text-4xl font-semibold mb-4">What makes us different?</h2>
          <p className="text-gray-400 mb-12 text-sm max-w-96">
            Our niche is to build unique apps that are made with surprisingly cool and incredible features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mx-10 md:mx-0">
          <FeatureCard
            imagePath="M21 7.5L18.75 6.187M21 7.5v2.25m0-2.25L18.75 8.813M3 7.5L5.25 6.187M3 7.5L5.25 8.813M3 7.5v2.25m9 3L14.25 11.437M12 12.75L9.75 11.437M12 12.75V15m0 6.75L14.25 20.437M12 21.75V19.5m0 2.25L9.75 20.437m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313M5.25 15.563L3 16.5v-2.25"
            cardTitle="Multiple Method"
            cardDescription="Using this app is pretty easy, as we have developed this with workable yet easy to use features."
          />

          <FeatureCard
            imagePath="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
            cardTitle="Newest Technology"
            cardDescription="Using this app is pretty easy, as we have developed this with workable yet easy to use features."
          />

          <FeatureCard
            imagePath="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
            cardTitle="Security First"
            cardDescription=" Designed with the latest technology, ensuring safety, security, and privacy of your data."
          />

          <FeatureCard
            imagePath="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            cardTitle="User Friendly"
            cardDescription="Its user-friendly features and design are the reason behind the increasing number of users."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
