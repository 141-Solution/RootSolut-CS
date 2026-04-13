export default function ChronologiePage() {
  const sections = [
    {
      id: "intro",
      title: "Einleitung",
      subtitle: "Eine kleine Chronologie der Schwießelmänner",
      content:
        "Die kleine Chronologie der Schwießelmänner folgt einem sehr subjektiven Erkenntnisinteresse eines Individuums, das darum weiß, dass \"Abkunft\", \"Herkunft\" und \"Zukunft\" nicht zufällig denselben Wortstamm haben. Wer nichts über seine Vorfahren wissen will, irrt blind durch Raum und Zeit. Bestenfalls ist er einer jener glücklichen, kindlichen Augenblicksmenschen, die von gestern und morgen nichts wissen wollen; schlimmstenfalls folgt er falschen Propheten, die ihn zum Objekt ihrer Interessen, Ideologien und Utopien machen. Ein durch die Herkunft geerdeter Mensch schaut zurück und sieht sicheres Terrain, selbst wenn er vor ihm liegende terrae incognitae durchschreitet.",
    },
    {
      id: "schwiessel",
      title: "Der Ort Schwiessel",
      content: `Eine Recherche in den Telefonbüchern, sozialen Medien und sonstigen Datenpfützen des Internets ergibt, dass nur wenige Dutzend Menschen in Deutschland diesen Namen tragen. Auch in der großen genealogischen Datenbank Geneanet taucht der Name nur 68-mal auf. Im Telefonbuch hat sich die Anzahl der Schwießelmänner innerhalb von 20 Jahren von 18 auf sechs reduziert, was sehr wahrscheinlich dem Aussterben der Festnetztelefonie geschuldet ist. Unter den deutschen Familiennamen dürfte dieser mecklenburgische Ortsname damit Seltenheit haben. Tatsächlich liegt der Schluss nahe, dass Schwießelmänner Männer und Frauen aus Schwiessel sind.

Das kleine Dorf in der mecklenburgischen Schweiz liegt auf der halben Strecke zwischen den Kleinstädten Laage und Teterow nahe der B 108 und wurde erstmalig 1379 urkundlich erwähnt. Ein altes und ein neues Gutshaus weisen auf eine typisch ostelbische Grundherrschaft hin, die wechselnden Eigentümerfamilien bieten eine Tour d'Horizon durch den mecklenburgischen Landadel. Wikipedia belehrt uns, dass das Gut im 14. Jahrhundert zunächst den Negendancks gehörte, einem "im Mannesstamm erloschenen" Geschlecht. "1561 veräußerte Joachim von Negendanck das Anwesen an Dietrich von Bevernest. Im Jahr 1667 fiel das Landgut erneut an die Familie Negendanck. 1732 verkaufte Berthold Diedrich von Negendanck Schwiessel an Hans Heinrich von Levetzow."`,
    },
    {
      id: "bassewitz",
      title: "Kammerherr von Bassewitz",
      content: `Hans Heinrich von Levetzow heiratete Anne Dorothea von Plessen, worauf das Allianzwappen über dem Portal des von 1732 bis 1735 errichteten alten Gutshauses deutet. "Feldmarschall Johann Ludwig von Wallmoden-Gimborn wurde 1782 Gutsherr zu Schwiessel; im Jahr 1838 wurde der Mecklenburg-Schwerinsche Kammerherr Adolph Christian Ulrich von Bassewitz mit dem Gut belehnt. In den 1860er Jahren ließ Henning von Bassewitz auf dem Gut ein neues schlossartiges Herrenhaus im Tudorstil errichten; das alte Fachwerkgutshaus wurde von dieser Zeit an als Gutsverwalterhaus weitergenutzt".

Das Gut umfasste Ende der 1920er Jahre "842,20 Hektar, davon etwa 100 Hektar Wald". Eigentümer waren Ernst-Henning Graf von Bassewitz (1858-1926) und dessen Neffe Georg-Henning von Bassewitz-Behr (1900-1949) auf Lützow. Letzterer schloss sich, weil die Güter schlecht liefen und alle Auswanderungspläne scheiterten, der nationalsozialistischen Bewegung an. Falls die Schwießelmänner wirklich aus Schwiessel stammen, dann dürfte ihr Leben als Tagelöhner auf den Gütern ähnlich arbeitsreich gewesen sein.`,
    },
    {
      id: "akademisch",
      title: "Akademische Weihen",
      content: `Am 8.10.1426 schrieb sich "Nicolaus Switselman" an der Universität Rostock ein, die als "Perle des Nordens" in ihrer Gründungsphase in einem exzellenten Ruf stand. Damaliger Rektor war Nicolaus Theoderici. Die Gebühr betrug laut Matrikelportal: ½ "fl."

Besagter Nicolaus - diesmal in der Schreibung "Swicelman" - promovierte im Wintersemester 1428/1429 zum "Bakkalar" an der Philosophischen Fakultät. Im Falle des "Bakkalars Schwitselman" verlieren sich allerdings die Spuren.

Die unterschiedliche Schreibweise des Namens im Studentenverzeichnis der Universität Rostock innerhalb von nur drei Jahren macht auf ein onomasiologisches Problem der Schwießelmänner aufmerksam: Ihre Schreibweise ist schon vor der Normierung der deutschen Sprache durch Konrad Duden höchst uneinheitlich.`,
    },
    {
      id: "nestbildungen",
      title: "Nestbildungen",
      content: `Im 17. Jahrhundert lässt sich der Name im Kopulationsregister der Güstrower Pfarrkirche mehrfach nachweisen. So heirateten dort am 9.4.1678 Ilsabe Schwießelmans und Paul Tietke. Vier Jahre später, am 6.9.1682, ehelichte Anna Margaretha Schwießelmans Andreas Haker.

Für das 18. Jahrhundert lässt sich das "Nest" der Schwießelmänner in Boitin/Lübzin ausmachen. Die stärksten Hinweise entstammen dem "Dorfsippenbuch Boitin und Lübzin", das 1939 im Zusammenhang mit genealogischen Forschungen veröffentlicht wurde. Als größere Stammreihen werden hier auch die Schwießelmänner gelistet, die in beiden Gutsdörfern zwischen den Kleinstädten Warin und Bützow bis ins 18. Jahrhundert als Tagelöhner nachweisbar sind.`,
    },
    {
      id: "boitiner",
      title: "Boitiner Steintanz",
      content: `Die Dörfer Boitin und Lübzin liegen in einem Nebental der Warnow in der hügeligen Endmoränenlandschaft, die typisch ist für das mittlere Mecklenburg. Seit 1765 ist der Ort bekannt für seine prähistorische Begräbnis- und Kultstätte, den Boitiner Steinkranz. Mehrere Ringe von Granitfindlingen von acht bis 14 Metern bilden einen Steinkalender, der auf die Wintersonnenwende geeicht ist. Der Menhir wird in der Volkssage als "Brautlade" verstanden.`,
    },
    {
      id: "tagelohner",
      title: "Die Tagelöhnerdynastie",
      content: `Das Dorf Boitin wurde erstmalig 1233 erwähnt und war ursprünglich ein Rundlingsdorf. Es erhielt 1252 eine Kirche und war eines von zwölf Stiftsdörfern des Stiftsamtes Bützow. Die Bauern mussten Lehnsherren für seinen Schutz Geld und Naturalien abgeben. Die Reformation machte die Bauern frei von den bischöflichen Frondiensten.

Das Dorfsippenbuch Boitin/Lübzin berichtet über die Schwießelmänner als Tagelöhnerdynastie. Den ersten Eintrag bildet Johann Otto Schwießelmann, Einlieger in Lübzin.`,
    },
    {
      id: "otto",
      title: "Urvater Otto",
      content: `Besagter Johann Otto Schwießelmann hat einen 1720 geborenen Vater, Otto Schwießelmann, 7facher Urgroßvater des Verfassers dieser Chronologie. Er markiert die heutige Wissensgrenze, die sich bislang mit genealogischen Plattformen nicht überwinden ließ.

Nach dem Dorfsippenbuch dürfte der Urahn Otto Schwießelmann neben Johann Otto Schwießelmann noch einen weiteren Sohn, Johann Joachim Schwießelmann, gezeugt haben. Der "Bäcker, Arbeitsmann und Einlieger in Lübzin" heiratete eine Maria Dorothea Stoffer (1732-1802). Das 1774 geborene gemeinsame Kind Leonore Juliane Schwießelmann heiratete den "Knecht und Arbeitsmann" Johann Joachim Friedrich Burmeister.`,
    },
    {
      id: "zernin",
      title: "Zerniner Ast",
      content: `Ein erster starker Ast wuchs nach Zernin. Er wurde begründet durch Johann Jürgen Schwießelmann (1777-1862) mit seiner Frau Elisabeth Maria (1796). Aus der Ehe gingen sechs Kinder hervor: Johann Joachim Christian Schwießelmann (1821-1866), Maria Sophia Dorothea Schwießelmann (1823), Magdalena Schwießelmann (1825-1829), und weitere.

Der letztgeborene setzte zwei Söhne in die Welt und begründet den Tarnower Zweig der Familie mit seinen fünf Kindern, darunter Otto Carl Friedrich Schwießelmann und Carl Heinrich Christian Martin Schwießelmann.`,
    },
    {
      id: "grossen",
      title: "Groß Raden",
      content: `Der Ast der Schwießelmänner in Groß Raden entsteht zwei Generationen später durch die Verehelichung von Johann Friedrich Wilhelm Christian Schwießelmann (1838-1894) mit Sophia Wilhelmine Maria Kröger (1840-1901).

Weil Sophie Kröger Tochter des Knechts aus Groß Raden war, übersiedelte die kinderreiche Familie dorthin. Aus der Groß Radener Sippe erwuchs ein starker Ast mit sieben Kindern.`,
    },
    {
      id: "ostmecklenburg",
      title: "Ein ostmecklenburgischer Stammvater",
      content: `Carl Heinrich Friedrich Wilhelm Schwießelmann (1845-1901), ein Tagelöhner, vermehrte die Sippschaft im Osten Mecklenburgs und ist zugleich Ahnherr des Verfassers. In Lübzin 1845 geboren, verheiratete sich der Tagelöhner am 3. November 1871 mit Marie Dorothea Wilhelmine Rhode (1844-1902).

Später führten ihn seine Wege über Groß Raden und Langensee auf das Gut Subzin, in der Nähe von Laage, auf dessen Friedhof er 1901 beigesetzt wurde. Aus der Ehe entstammen neun Kinder, die sich in verschiedene Regionen Mecklenburgs verbreiteten.`,
    },
    {
      id: "rostocker",
      title: "Die Rostocker Schwießelmännerei",
      content: `Der 5. Sohn Carl Heinrich Friedrich Wilhelm Schwießelmanns war Heinrich Johann Wilhelm Schwießelmann (1884-1936). Mit sechs Kindern hinterließ er Spuren in der Hansestadt Rostock. Aus dem Rostocker Adressbuch von 1935 ist sein Beruf und Wohnsitz zu entnehmen: "Arbeitsmann, Grubenstraße 15".

Sein Sohn Wilhelm heiratete Henni Meier und hinterließ vier Kinder, bevor er am 19. März 1945 beim Rückzug der Wehrmacht starb.`,
    },
    {
      id: "berliner",
      title: "Berliner Musiker und Dozenten",
      content: `Friedrich Julius Gottlieb Schwießelmann ging als Schuhmachermeister von Neustrelitz nach Berlin und heiratete dort Charlotta Dorothea Maria Bethke.

Sein Sohn Carl Julius Robert Alexander Schwießelmann konnte sich aus dem Schusterstand emanzipieren und wurde Musiklehrer. Der in der Hauptstraße 142 wohnende Musikus ehelichte am 28.3.1895 die Tochter des Bäckermeisters Ferdinand Christoph Siebert.

Sein Enkel Martin Robert Julius Schwießelmann hinterließ bei seinem Tode 1979 nicht nur seine Frau Margarete, sondern auch einen Nachruf zum Tode des französischen Philosophen Henri Bergson, der 1949 in der Neuphilologischen Zeitschrift erschien.`,
    },
    {
      id: "stadtflucht",
      title: "Stadtflucht und Moderne",
      content: `Das 19. Jahrhundert markiert den Aufbruch in die Moderne. Die Industrialisierung lässt die Großstädte wachsen und zieht die Bevölkerungsüberschüsse der Dörfer magnetisch in die Mauern der Stadt. Die Rolle der Kinder von zahlreichen billigen Arbeitskräften in der Landwirtschaft zu wenigen teuren Spezialisten in Industrie und Verwaltung ändert sich vollständig.

Dieser gesellschaftliche Wandel mit der Entwurzelung der Mecklenburger aus Mecklenburg verstärkte sich nochmals durch die Bevölkerungsumschichten am Ende des Zweiten Weltkriegs. Das bäurische Milieu ist marginalisiert. Stattdessen verlieren sich die Spuren von Laage, Tarnow, Bützow weit über Mecklenburg hinaus bis nach Bayern, Sachsen und Thüringen.`,
    },
    {
      id: "welt",
      title: "Die Welt als Dorf",
      content: `Dabei finden sich manche Kuriositäten, wie den Landarzt Albert Schwießelmann aus Vorpommern, der von 1964 bis 2002 in Franzburg als Landarzt praktizierte.

Durch Auswanderung und Verheiratung verließen Schwießelmänner und -frauen ihr natürliches Habitat sogar bis nach Amerika. So lässt sich der Name "Schwießelmann" in den Vereinigten Staaten nachweisen, in die die Tagelöhner des 19. Jahrhunderts auswanderten, um der Armut und Enge zu entkommen und sich dort als Landeigentümer ein besseres Leben aufzubauen.

Auf unsere Herkunft aus der mecklenburgischen Ackerfurche können wir Schwießelmänner stolz sein.`,
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-10 lg:space-y-12">
      {/* Header */}
      <div className="section-shell rounded-[2rem] px-5 py-7 sm:px-8 sm:py-9">
        <h1 className="mb-3 text-5xl font-semibold text-[var(--brown-deep)] sm:text-6xl">Chronologie</h1>
        <p className="max-w-3xl text-base leading-relaxed text-[rgba(45,36,23,0.78)] sm:text-lg">
          Eine kleine Chronologie der Schwießelmänner – von Rostock bis Berlin, vom Mittelalter bis heute.
        </p>
      </div>

      {/* Table of Contents */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="paper-panel rounded-2xl px-4 py-3 text-sm font-medium text-[var(--brown-deep)] transition-colors hover:bg-[rgba(227,236,222,0.65)]"
          >
            {section.title}
          </a>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-16">
        {sections.map((section, idx) => (
          <section
            key={section.id}
            id={section.id}
            className="section-shell scroll-mt-24 rounded-[2rem] px-5 py-6 sm:px-7 sm:py-8"
          >
            {/* Section Header */}
            <div className="mb-6 border-b border-[rgba(95,61,40,0.14)] pb-4">
              <div className="flex items-start gap-4">
                <div className="text-2xl font-semibold text-[var(--orange-deep)] opacity-50 select-none sm:text-3xl">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-semibold text-[var(--brown-deep)] sm:text-[2.2rem]">{section.title}</h2>
                  {section.subtitle && (
                    <p className="mt-1 text-sm italic text-[var(--green-deep)]">{section.subtitle}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-none">
              <div className="space-y-4 text-[var(--foreground)] leading-relaxed">
                {section.content.split("\n\n").map((para, pidx) => (
                  <p key={pidx} className="text-base sm:text-[1.05rem]">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Section Footer */}
            <div className="mt-8 flex flex-col gap-3 border-t border-[rgba(95,61,40,0.1)] pt-5 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
              <span>Abschnitt {idx + 1} von {sections.length}</span>
              {idx < sections.length - 1 && (
                <a
                  href={`#${sections[idx + 1].id}`}
                  className="font-semibold text-[var(--green-deep)] transition-colors hover:text-[var(--brown-deep)]"
                >
                  Nächster Abschnitt →
                </a>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Back to top */}
      <div className="flex justify-center pt-8">
        <a
          href="#intro"
          className="rounded-full bg-[var(--green-deep)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brown-deep)]"
        >
          ↑ Nach oben
        </a>
      </div>

      {/* Footer */}
      <div className="mt-16 border-t border-[rgba(95,61,40,0.14)] pt-8 text-center text-sm text-stone-500">
        <p className="italic">Christian Schwießelmann, zu Weihnachten 2025 in Geltow</p>
      </div>
    </div>
  );
}
