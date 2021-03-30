## Starta applikation

Jag har har kört på node i denna uppgift!

Starta programmet med "node index.js" (om du har node installerat) i terminalen (stå i root-folder "plain-text-to-xml").

## Uppgift

Det ena systemet levererar ett radbaserat filformat medan det andra kräver XML. Du ska skriva en konverterare som bygger upp rätt XML-struktur. Använd valfritt programspråk! (dock ej C/C++/Python)

Filformat:

P|förnamn|efternamn  
T|mobilnummer|fastnätsnummer  
A|gata|stad|postnummer  
F|namn|födelseår  
P kan följas av T, A och F  
F kan följas av T och A

Exempel:

```
P|Carl Gustaf|Bernadotte
T|0768-101801|08-101801
A|Drottningholms slott|Stockholm|10001
F|Victoria|1977
A|Haga Slott|Stockholm|10002
F|Carl Philip|1979
T|0768-101802|08-101802
P|Barack|Obama
A|1600 Pennsylvania Avenue|Washington, D.C
```

Ger XML som:

```
<people>
  <person>
    <firstname>Carl Gustaf</firstname>
    <lastname>Bernadotte</lastname>
    <address>
      <street>Drottningholms slott</street>
      ...
     </address>
    <phone>
      <mobile>0768-101801</mobile>
      ...
    </phone>
    <family>
      <name>Victoria</name>
        <born>1977</born>
        <address>...</address>
     </family>
     <family>...</family>
  </person>
  <person>...</person>
</people>
```
