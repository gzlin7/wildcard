'use strict';

import { urlExact, urlContains, extractNumber, onDomReady } from "../utils";
import DomScrapingBaseAdapter from "./domScrapingBase"

class FluxAdapter extends DomScrapingBaseAdapter {
  static enabled () {
    return urlContains("flux2.luar.dcc.ufmg.br")
  }

  initialize () {
    onDomReady(() => {
      this.loadTable();
      document.addEventListener("click", (e) => { this.loadTable() });
    })
  }

  siteName = "Flux Table"

  colSpecs = [
    { name: "id", type: "text", hidden: true },
    { name: "0", type: "numeric", editable: true},
    { name: "1", type: "numeric", editable: true},
    { name: "2", type: "numeric", editable: true},
    { name: "3", type: "numeric", editable: true},
    { name: "4", type: "numeric", editable: true},
    { name: "5", type: "numeric", editable: true},
    { name: "6", type: "numeric", editable: true},
    { name: "7", type: "numeric", editable: true},
    { name: "8", type: "numeric", editable: true},
    { name: "9", type: "numeric", editable: true},
    { name: "10", type: "numeric", editable: true},
    { name: "11", type: "numeric", editable: true},
  ]

  scrapePage() {
    let result = []
    let tbody = document.querySelector("#j_id__v_37_j_id33 tbody")

    for (let i = 0; i < 8; i++) {
      result.push(
        {
          els: [tbody.children[i]],
          dataValues: {
            "id": i,
            "0": document.querySelector(`#valorBrutoAbs--${i}--0`),
            "1": document.querySelector(`#valorBrutoAbs--${i}--1`),
            "2": document.querySelector(`#valorBrutoAbs--${i}--2`),
            "3": document.querySelector(`#valorBrutoAbs--${i}--3`),
            "4": document.querySelector(`#valorBrutoAbs--${i}--4`),
            "5": document.querySelector(`#valorBrutoAbs--${i}--5`),
            "6": document.querySelector(`#valorBrutoAbs--${i}--6`),
            "7": document.querySelector(`#valorBrutoAbs--${i}--7`),
          }
        }
      )
    }

    return result
  }
}

export default FluxAdapter;