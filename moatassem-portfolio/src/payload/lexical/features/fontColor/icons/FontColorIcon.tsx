'use client'

import React, { useEffect } from 'react'
import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & { underscoreColor?: string }

export function FontColorIcon(props?: Props) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '5px',
        border: 'none',
        outline: 'none',
      }}
      id="lexical-font-color-icon"
    >
      <svg
        viewBox="0 0 18.427431 19.958412"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="20px"
        height="10px"
        opacity={'0.7'}
        fill="currentColor"
      >
        <defs id="defs1" />
        <g id="layer1" transform="translate(-48.7557,-53.083586)">
          <path
            d="m 63.703631,73.042 -1.94852,-5.483692 H 54.155883 L 52.235199,73.042 h -3.4795 l 7.404376,-19.958413 h 3.61868 L 67.183131,73.042 Z M 58.999347,59.346688 q -0.111344,-0.334032 -0.306196,-0.97426 -0.194852,-0.668064 -0.41754,-1.336128 -0.194852,-0.6959 -0.306196,-1.141276 -0.13918,0.55672 -0.334032,1.25262 -0.194852,0.6959 -0.389704,1.308292 -0.167016,0.584556 -0.27836,0.890752 l -1.865012,5.372348 h 5.762052 z"
            id="text1"
            aria-label="A"
          />
        </g>
      </svg>
      {props?.underscoreColor ? (
        <div
          style={{
            marginTop: '3px',
            width: '20px',
            height: '3px',
            backgroundColor: props.underscoreColor,
          }}
        ></div>
      ) : (
        <div style={{ fontSize: '8px', marginTop: '1px' }}>???</div>
      )}
    </div>
  )
}
