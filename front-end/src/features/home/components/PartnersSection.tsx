interface Partner {
  country: string;
  flag: string;
}

const PARTNERS: Partner[] = [
  {
    country: 'Việt Nam',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw_5ui39yMXdzWvaC4YUp-9V23M1pxtHk9qhO7z_0Z1lrU0Z93zF6Kx5JmPVKLN-5Vb5927tmsUkZVpNMU0ukjPUHOr83UqdzKrb3rG4bYe7J1aJzzA2QnC3k-GfOSpNA0S_6Zmq5prDXOoxPAAlw6KCnE9FdOOgiFM9Ehwrbzeh4elSwRLpXMKO9L1KAugY39Lr3raDKWk5nDctYbN6SOi3OSr599loQo522xVsmmluFLuo8Bv5FjNVYj9VTm2cmAxbIyfBcXIUY',
  },
  {
    country: 'Hàn Quốc',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMOQJLaqJ5em7SB54tkIFX2yAk-sTHQkjJdLLNJGB4FY1XwTXEkLORY0N4xpdgThBPUwrBeGVqhJwB6oGBrB25fhCVlTtRvW9e0EXwCypEHmRsEyXv_zcAGVJq9bwu7LUTJhfWf9UnOJpmBLrjxWcIlqKndjTFMu-b1xpjEJYf1Lxhubh95yoJXXvrK1wpqVzF7jC7jBMtOt9VyDguDVXTfY6dYbBTPvPSdxd49BsRCMuJWTBrpxDRLfwz0E_YA7c60WTDkfCm-7w',
  },
  {
    country: 'Nhật Bản',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7OWCEY5hz-2youow4itPVvCUZFtfrOVK8Oo2isulj7XfEtyoleubHVRogCKWogbKNMM0PbvVHp6mYJ0mf3RCt3TjrXXH6aTPNpCGbiRfdSQFTifeXlfkpi7KFogoEk_sEVYzYgkcfF2EX2NvesLsEuHmgEjPETzoiEJSHODc6EmckDofE5iyCnVfa1m699ozsppHz8fBzSpEqVephWsr23w8N8DdCE1hkZizO_Hnp1VT15pOHcLGwrQjBTwZLow86m0OZTliRfSo',
  },
  {
    country: 'Hoa Kỳ',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO77js4qIsd3TdZUtX7gMtY52DKb5Xla1JHW0ca8S8Eo69Xl5NYzYINCopLUU5Qep2zjMaRzo-wU7sD9IMRD0dSvJ6KaeirBSXReTIGiMjNpUjvi73euBy4UAtew5yI7Dhd_65aUGjAtU-wJw9KhNwY4_PbUu8P245j_gjgewcs618k5gOkLtm8le1MIOaBTleRd5btMYmQvxU4M36eLLtCeWJDaRfcowIFfQW0_n7DaMR-ZICSeqWW_yagO_Ahgg-rPlvLjIuLIs',
  },
  {
    country: 'Đức',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqKf7yV-uc5qY8uprMoLOgPefdTp-oxv19fz6Leu-f0KUXGIVdjbrhkioNtf8fyf-qCYWahhjGcsq5Ofx4msOqNSnS9O9TN5K_VbQ4F6ag622PkHMBSSscuzpt9O977yJfN10MTm6b8cliUef-6VdvgIrMS4ENSU7rN-7Wn9BCVQ7UTnMKKoaR-YrdxzI0_QcleojNDmIN5YOH7cScjh5CA86tYf39YnYQUi20JApJmCQu9o_KEqQFxgEy9htJU5GL3_LfU-HJL-w',
  },
  {
    country: 'Singapore',
    flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHYRZ7CU_A2IGNqAHfpGhUBoF1CnFzMIu7Q-x-du3lJgBx1v_OIBxT4L1PjqHZEohPrOk2CICnHPZn-JCcXByqbFeSAh10j7sJmSlPBTpTj_vaAPTrPlUGkil3TDeKRoGidLnHG8sbRVa9mk3_xihX7t296-Klh5_9QH-oILMdVUcanNhkGE0lZ12DhTuNXvWgKLLrumEmn3MwFNjK9e887Q97E7AIgJScLZd5jrXsyHsic8EnNVB5_kwRqVvT83rxt4LFgygvBpc',
  },
];

export function PartnersSection() {
  return (
    <section id="about" className="bg-surface-container py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-20 xl:px-28">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-label-md font-body uppercase tracking-[0.12em] text-secondary mb-3">
            Phân phối toàn cầu
          </p>
          <h2 className="text-headline-lg font-headline font-medium text-on-surface mb-4">
            Trusted Worldwide
          </h2>
          <p className="text-body-md font-body text-on-surface-variant">
            Nhân sâm cao cấp của chúng tôi đến tay những khách hàng sành điệu trên toàn cầu
            thông qua mạng lưới đối tác quốc tế của chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {PARTNERS.map((partner) => (
            <div
              key={partner.country}
              className="flex flex-col items-center gap-3 bg-surface-container-lowest rounded-lg px-4 py-6 border border-outline-variant/30 hover:border-outline/50 transition-colors duration-150"
            >
              <img
                src={partner.flag}
                alt={`${partner.country} Flag`}
                className="h-10 w-16 object-cover rounded-sm"
              />
              <span className="text-body-sm font-body text-on-surface-variant text-center">
                {partner.country}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
