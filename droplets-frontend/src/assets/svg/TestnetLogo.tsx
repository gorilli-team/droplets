import React, { SVGProps } from "react";

const TestnetLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    id="Livello_1"
    viewBox="0 0 400 400"
    {...props}
  >
    <style>{".st2{fill:#fff}"}</style>
    <circle
      cx={200}
      cy={200}
      r={200}
      style={{
        fill: "#bdc5d1",
      }}
    />
    <path
      d="M200 49.01v212.14l-94.72-55.58z"
      style={{
        fill: "#f4f4f4",
      }}
    />
    <path d="M200 49.01v212.14l94.72-55.58z" className="st2" />
    <path
      d="M104.85 215.67 200 349.26l95.15-133.59L200 271.5z"
      className="st2"
    />
  </svg>
);

export default TestnetLogo;
