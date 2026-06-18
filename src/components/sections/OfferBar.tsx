import { Percent, PiggyBank, CalendarCheck } from "lucide-react";

const OFFERS = [
  { icon: Percent, title: "50% Off Installation", note: "On your full window, door & siding project" },
  { icon: PiggyBank, title: "Financing as Low as $5/Day", note: "GreenSky® — quick approval, keep your cash" },
  { icon: CalendarCheck, title: "Free In-Home Estimate", note: "No obligation, no pressure, no runaround" },
];

export default function OfferBar(): React.JSX.Element {
  return (
    <section id="offer-bar" className="bg-gold-500">
      <div className="container-max grid py-2 sm:grid-cols-3 sm:divide-x sm:divide-navy-900/15">
        {OFFERS.map((offer) => (
          <div
            key={offer.title}
            className="flex items-center gap-3 px-2 py-4 sm:justify-center sm:px-6"
          >
            <offer.icon className="h-7 w-7 shrink-0 text-navy-900" strokeWidth={2} />
            <div>
              <p className="font-display text-base font-bold leading-tight text-navy-900">
                {offer.title}
              </p>
              <p className="text-xs text-navy-900/70">{offer.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
