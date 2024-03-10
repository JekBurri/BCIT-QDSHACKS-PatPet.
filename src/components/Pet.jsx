import { useRef, useEffect, useState } from "react";
import axios from "axios";
import ActionButtonBar from "./ActionButtonBar";
import defaultCat from "./DefaultCat";


const Pet = ({ initialImage }) => {
  return (
    <div className="w-full">
        <div id="cat-cont">
            {/* <?xml version="1.0" encoding="UTF-8"?> */}
            <svg id="cat-svg" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 205.88 158.82">
                <defs>
                    <style>
                        #cat1 .cls-1 (
                            fill: '#120b01'
                        ),

                        #cat1 .cls-1, .cls-2, .cls-3, .cls-4, .cls-5, .cls-6, .cls-7, .cls-8 (
                            strokeWidth: 0
                            ),

                        #cat1 .cls-2 (
                            fill: '#e24e27',
                        ),

                        #cat1 .cls-3 (
                            fill: '#120a07',
                        ),

                        #cat1 .cls-4 (
                            fill: '#e9f0e6',
                        ),

                        #cat1 .cls-5 (
                            fill: '#f3b1a9',
                        ),

                        #cat1 .cls-6 (
                            fill: '#6d2821',
                        ),

                        #cat1 .cls-7 (
                            fill: '#eed0a2',
                        ),

                        #cat1 .cls-8 (
                            fill: '#e79034',
                        ),

                        #play-cat .cls-1 (
                            fill: '#e24e27',
                            ),
                    
                            #play-cat .cls-1, .cls-2, .cls-3, .cls-4, .cls-5, .cls-6, .cls-7, .cls-8, .cls-9 (
                            stroke-width: 0,
                            ),
                    
                            #play-cat .cls-2 (
                            fill: '#120a07',
                            ),
                    
                            #play-cat .cls-3 (
                            fill: '#e9f0e6',
                            ),
                    
                            #play-cat .cls-4 (
                            fill: '#c4da53',
                            ),
                    
                            #play-cat .cls-5 (
                            fill: '#7a1c20',
                            ),
                    
                            #play-cat .cls-6 (
                            fill: '#f3b1a9',
                            ),
                    
                            #play-cat .cls-7 (
                            fill: '#eed0a2',
                            ),
                    
                            #play-cat .cls-8 (
                            fill: '#e79034',
                            ),
                    
                            #play-cat .cls-9 (
                            fill: '#fff',
                            ),

                            #sleep-cat .cls-1 (
                            fill: '#e14e27',
                            ),
                    
                            #sleep-cat .cls-1, .cls-2, .cls-3, .cls-4, .cls-5, .cls-6, .cls-7 (
                            stroke-width: 0,
                            ),
                    
                            #sleep-cat .cls-2 (
                            fill: '#f2b0a8',
                            ),
                    
                            #sleep-cat .cls-3 (
                            fill: '#120a07',
                            ),
                    
                            #sleep-cat .cls-4 (
                            fill: '#e68f34',
                            ),
                    
                            #sleep-cat .cls-5 (
                            fill: '#7a1c20',
                            ),
                    
                            #sleep-cat .cls-6 (
                            fill: '#edcfa1',
                            ),
                    
                            #sleep-cat .cls-7 (
                            fill: '#fff',
                            ),

                            #eat-cat .cls-1 (
                            fill: '#010801',
                            ),
                    
                            #eat-cat .cls-1, .cls-2, .cls-3, .cls-4, .cls-5, .cls-6, .cls-7, .cls-8, .cls-9, .cls-10, .cls-11, .cls-12 (
                            stroke-width: 0,
                            ),
                    
                            #eat-cat .cls-2 (
                            fill: '#f2b0a8',
                            ),
                    
                            #eat-cat .cls-3 (
                            fill: 'none',
                            ),
                    
                            #eat-cat .cls-4 (
                            fill: '#df6535',
                            ),
                    
                            #eat-cat .cls-5 (
                            fill: '#e3642f',
                            ),
                    
                            #eat-cat .cls-6 (
                            fill: '#eecba5',
                            ),
                    
                            #eat-cat .cls-7 (
                            fill: '#6fbff4,'
                            ),
                    
                            #eat-cat .cls-8 (
                            fill: '#f45669',
                            ),
                    
                            #eat-cat .cls-9 (
                            fill: '#2b2b2b',
                            ),
                    
                            #eat-cat .cls-10 (
                            fill: '#75281b',
                            ),
                    
                            #eat-cat .cls-11 (
                            fill: '#e79034',
                            ),
                    
                            #eat-cat .cls-12 (
                            fill: '#fff',
                            )
                    </style>
                </defs>
                <defaultCat />
            </svg>
        </div>
              
      
      <div className="absolute bottom-6 left-4">
        <ActionButtonBar
          onWater={() => handleAction("water")}
          onFeed={() => handleAction("feed")}
          onSleep={() => handleAction("sleep")}
          onPlay={() => handleAction("play")}
        />
      </div>
    </div>
  );
};

export default Pet;
