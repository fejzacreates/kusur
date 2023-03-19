//Pravimo funkciju koja ima 3 parametra
function kusur(valute, proizvod, placeno) {
    //Oduzimamo koliko je kupac platio od proizvoda i stavljamo u varijablu change(kusur)
    let change = placeno - proizvod;
    //Kreiramo prazan objekat koji cemo poslije popuniti rezultatima
    let result = {};
    //Kreiramo varijablu sa vrijednoscu 0. 
    let ukupno = 0;
    //Dodajemo konstantu nase valute
    const KM = "KM";
    //Naslov
    console.log("OBJEKAT \n");
    //Ako je kupac dao manje novca od cijene proizvoda, da vrati tekst.
    if (placeno < proizvod) {
        return "Nemate dovoljno novca";
    }
    //Ako je kupac dao tacno novca koliko proizvod kosta, vraca tekst da ima 0 kusura.
    if (placeno == proizvod) {
        return "0 Kusur";
    }
    //Kreiramo for petlju koja loopa kroz valute, od najvece do najmanje(obrnuto).
    for (let i = valute.length - 1; i >= 0; i--) {
        //Racunamo koliko puta foreach valuta mora da se ponovi, da nas change(kusur) bude popunjen.
        let count = Math.floor(change / valute[i]);
        //Ako je ponavljanje vece od 0.
        if (count > 0) {
            /*
            Nikada gotovo necemo imati sve iskoristene valute u nasem nizu valuta.
            One valute koje najbolje odgovaraju vracanju kusura (najjednostavniji nacin),
            se mnoze sa gore izracunatim count(koliko puta se ponavlja).
            */
            const total = valute[i] * count;
            result[valute[i]] = { count, total };
            //Dodajemo rezultat prethodno deklarisanoj praznoj varijabli ukupno(linija 8).
            ukupno += total;
            //Oduzimamo Total/Rezultat nakon mnozenja i oduzimamo sa change(kusurom).
            change -= total;
        }
    }
    //Sada, pushamo objektu rezultate koje smo prethodno izracunali.
    //Pushamo u result(objekat) Tekst kojim cemo poslije ciljati taj dio i dajemo vrijednost ukupno koja je svedena na dvije decimale
    result["Ukupno"] = ukupno.toFixed(2);
    //U slucaju da proizvod kosta npr: 11.11; Pushamo prethodno izracunat change koji je visak tj nismo u stanju da vratimo. I ovo je svedeno na dvije decimale.
    result["Nismo u stanju vratiti"] = change.toFixed(2);
    //Run-amo result koji ce nam pokazati objekat i sve vrijednosti koje smo pushali.
    console.log(result);
    //Dodajemo dekorativni breakline i naslov
    console.log("-----------------------------------\n");
    console.log("KUSUR PROGRAM \n");
    //Sada, pravimo preglednost programa.
    let displayResult = "";
    //Object.entries(result) vraća niz parova, objekta rezultata, pri čemu je svaki par predstavljen kao niz od dva elementa. Ovi parovi su pohranjeni u nizu konstanti unosa radi lakšeg ponavljanja koristeći for petlju.
    const entries = Object.entries(result);
    for (let [key, value] of entries) {
        if (key !== "Nismo u stanju vratiti" && key !== "Ukupno") {
            //Ispisujemo rezultat koji ima neku aestetiku i preglednost(UX).
            displayResult += "Potrebne Valute: " + key +KM+ " | " + "Puta: " + value.count + " | " + "Rezultat: " + value.total.toFixed(2) +KM+ "\n"
        }
    }
    //Ispisujemo koliko ukupno novca trebamo vratiti. I koliko nismo u stanju vratiti (u slucaju da je proizvod = 40.21 KM). Necemo moci vratiti 0.01 KM.
    return displayResult + "\nUkupno za Vratiti: " + result["Ukupno"] +KM+ " | " + "Nismo u stanju vratiti: " + result["Nismo u stanju vratiti"]+KM;
}

//Pravimo niz valuta od najmanje do najvece.
const valute = [0.1, 0.2, 1, 2, 5, 10, 20, 50, 100];
//Pravimo varijablu cijene proizvoda
let proizvod = 40.21;
//Pravimo varijablu koliko je kupac platio
let placeno = 50;
//Ispisujemo GUI
const optimalanKusur = kusur(valute, proizvod, placeno);
console.log(optimalanKusur + '\n');
console.log("-----------------------------------");