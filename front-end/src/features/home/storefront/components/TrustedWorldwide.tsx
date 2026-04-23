import Image from 'next/image';

interface CountryFlag {
  name: string;
  src: string;
  alt: string;
}

const countryFlags: CountryFlag[] = [
  {
    name: 'Vietnam',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw_5ui39yMXdzWvaC4YUp-9V23M1pxtHk9qhO7z_0Z1lrU0Z93zF6Kx5JmPVKLN-5Vb5927tmsUkZVpNMU0ukjPUHOr83UqdzKrb3rG4bYe7J1aJzzA2QnC3k-GfOSpNA0S_6Zmq5prDXOoxPAAlw6KCnE9FdOOgiFM9Ehwrbzeh4elSwRLpXMKO9L1KAugY39Lr3raDKWk5nDctYbN6SOi3OSr599loQo522xVsmmluFLuo8Bv5FjNVYj9VTm2cmAxbIyfBcXIUY',
    alt: 'Vietnam Flag',
  },
  {
    name: 'South Korea',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMOQJLaqJ5em7SB54tkIFX2yAk-sTHQkjJdLLNJGB4FY1XwTXEkLORY0N4xpdgThBPUwrBeGVqhJwB6oGBrB25fhCVlTtRvW9e0EXwCypEHmRsEyXv_zcAGVJq9bwu7LUTJhfWf9UnOJpmBLrjxWcIlqKndjTFMu-b1xpjEJYf1Lxhubh95yoJXXvrK1wpqVzF7jC7jBMtOt9VyDguDVXTfY6dYbBTPvPSdxd49BsRCMuJWTBrpxDRLfwz0E_YA7c60WTDkfCm-7w',
    alt: 'South Korea Flag',
  },
  {
    name: 'Japan',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7OWCEY5hz-2youow4itPVvCUZFtfrOVK8Oo2isulj7XfEtyoleubHVRogCKWogbKNMM0PbvVHp6mYJ0mf3RCt3TjrXXH6aTPNpCGbiRfdSQFTifeXlfkpi7KFogoEk_sEVYzYgkcfF2EX2NvesLsEuHmgEjPETzoiEJSHODc6EmckDofE5iyCnVfa1m699ozsppHz8fBzSpEqVephWsr23w8N8DdCE1hkZizO_Hnp1VT15pOHcLGwrQjBTwZLow86m0OZTliRfSo',
    alt: 'Japan Flag',
  },
  {
    name: 'USA',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO77js4qIsd3TdZUtX7gMtY52DKb5Xla1JHW0ca8S8Eo69Xl5NYzYINCopLUU5Qep2zjMaRzo-wU7sD9IMRD0dSvJ6KaeirBSXReTIGiMjNpUjvi73euBy4UAtew5yI7Dhd_65aUGjAtU-wJw9KhNwY4_PbUu8P245j_gjgewcs618k5gOkLtm8le1MIOaBTleRd5btMYmQvxU4M36eLLtCeWJDaRfcowIFfQW0_n7DaMR-ZICSeqWW_yagO_Ahgg-rPlvLjIuLIs',
    alt: 'USA Flag',
  },
  {
    name: 'Germany',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqKf7yV-uc5qY8uprMoLOgPefdTp-oxv19fz6Leu-f0KUXGIVdjbrhkioNtf8fyf-qCYWahhjGcsq5Ofx4msOqNSnS9O9TN5K_VbQ4F6ag622PkHMBSSscuzpt9O977yJfN10MTm6b8cliUef-6VdvgIrMS4ENSU7rN-7Wn9BCVQ7UTnMKKoaR-YrdxzI0_QcleojNDmIN5YOH7cScjh5CA86tYf39YnYQUi20JApJmCQu9o_KEqQFxgEy9htJU5GL3_LfU-HJL-w',
    alt: 'Germany Flag',
  },
  {
    name: 'Singapore',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHYRZ7CU_A2IGNqAHfpGhUBoF1CnFzMIu7Q-x-du3lJgBx1v_OIBxT4L1PjqHZEohPrOk2CICnHPZn-JCcXByqbFeSAh10j7sJmSlPBTpTj_vaAPTrPlUGkil3TDeKRoGidLnHG8sbRVa9mk3_xihX7t296-Klh5_9QH-oILMdVUcanNhkGE0lZ12DhTuNXvWgKLLrumEmn3MwFNjK9e887Q97E7AIgJScLZd5jrXsyHsic8EnNVB5_kwRqVvT83rxt4LFgygvBpc',
    alt: 'Singapore Flag',
  },
];

function FlagItem({ flag }: { flag: CountryFlag }) {
  return (
    <div className="flex flex-col items-center gap-3 w-40 shrink-0">
      <div className="w-full aspect-[3/2] rounded-lg overflow-hidden shadow-sm border border-outline-variant/30 relative">
        <Image src={flag.src} alt={flag.alt} fill className="object-cover" />
      </div>
      <span className="font-body font-semibold text-on-surface-variant text-sm">{flag.name}</span>
    </div>
  );
}

export default function TrustedWorldwide() {
  return (
    <section className="w-full max-w-screen-2xl mx-auto px-8 mb-32">
      <div className="flex flex-col items-center mb-12 text-center">
        <h2 className="font-headline text-4xl text-on-surface mb-4">Trusted Worldwide</h2>
        <p className="font-body text-on-surface-variant max-w-2xl">
          Our premium ginseng reaches discerning customers across the globe through our network of international
          partners.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-scroll">
          {/* Original set */}
          <div className="flex gap-16 px-8 items-center shrink-0">
            {countryFlags.map((flag) => (
              <FlagItem key={flag.name} flag={flag} />
            ))}
          </div>
          {/* Cloned set for seamless loop */}
          <div className="flex gap-16 px-8 items-center shrink-0" aria-hidden="true">
            {countryFlags.map((flag) => (
              <FlagItem key={`clone-${flag.name}`} flag={flag} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
