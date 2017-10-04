# medo.check Messaging API

Die [medo.check Messaging API](https://messaging.medocheck.com) erlaubt es Verwaltungssystemen, alle für medo.check relevanten Stammdatenänderungen, sowie Check-In und Check-Out informationen zu senden, um dem gemeinsamen Kunden eine best-mögliche Integration beider Systeme zu bieten.

Da medo.check lokal in den Standorten installiert wird und einige Anbieter Internetlösungen zur Verfügung stellen, wird hier die Brücke zwischen lokal und Internet geschlossen.

## Vorbereitung und Autorisierung

Um die [medo.check Messaging API](https://messaging.medocheck.com) zu benutzen, wird für jeden Partner eine **Partner-ID** und für jeden gemeinsamen Kunden des Partners und medo.check ein **API-Key** benötigt. Dies wird benötigt, um sicherszustellen, dass die Daten nur den entsprechenden Kunden erreichen werden und niemand anderes Zugriff auf die Daten bekommt.

Die **Partner-Id** und der **API-Key** werden auf Anfrage von medo.check erstellt.

Wenn unter dem gemeinsamen Kunden mehrere Standorte geführt werden, muss der Partner medo.check eine List der **eindeutigen Standort-IDs** mitteilen, damit die Nachrichten dem richtigen Standort zugewiesen werden können (z.B. der Kunde im richtigen Standort als eingecheckt angezeigt wird).

## Senden einer Nachricht

Das Senden einer Nachricht an medo.check funktioniert immer gleich. Es gibt genau einen Endpoint:

    https://messaging.medocheck.com/messages/publish

Die Daten werden via **Http POST** gesendet. Die Daten werden im **JSON-Format** erwartet und zur Autorisierung ein API Key als Bearer Token.

### Request Header

Die medo.check Messaging API erwartet folgende Request Header:

| Header        | Inhalt            |
| ------        | ------            |
| Content-Type  | application/json  |
| Authorization | Bearer *API-KEY*  |

### Request Body

Der Request Body enthält die Nachricht im **Json-Format**. Sie ist wie folgt definiert:

#### Message

|    |   Type | Description | Required  |
| -- | ------ | ----------- | --------- |
| id |  `string`| Eindeutige Id der Nachricht, gewünschtes Format: *GUID* oder *UUID* | Yes |
|  sender | `Sender`| Identifikationsdaten des Senders | Yes |
| receiver | `Receiver`| Identifikationsdaten des Empfängers, z.B. zur weiterverteilung an verschiedene Standorte | no
| messageType | `string`| Nachrichtentyp. *Siehe Abschnitt Nachrichtentypen in dieser Dokumentation!* | Yes |
| payload | `object` | Nutzdaten der Nachricht, passend zum Nachrichtentyp | Yes

#### Sender

|    |   Type | Description | Required  |
| -- | ------ | ----------- | --------- |
| id | `string`| ID des Partners von medo.check. Die ID wird dem Partner von medo.check zur Verfügung gestellt und muss mit jeder Nachricht übermittelt werden. | yes |
| name | `string`| Name des Senders Klartext | yes |

#### Receiver

|    |   Type | Description | Required  |
| -- | ------ | ----------- | --------- |
| clientId | `string`| Hat ein gemeinsamer Kunde mehrere Standorte, die zusammen unter einem Mandanten geführt werden, muss hier eine **eindeutige Standort-ID** gesendet werden, um eine zuordnung des Standorts zu ermöglichen. Eine Liste dieser **Standort-IDs** muss medo.check mitgeteilt werden. | yes |

Folgendes Beispiel definiert eine korrekte Nachricht:

```json
{
    "id" : "088eee45-0935-4e61-a91d-c1f0d6561120",
    "sender": {
        "id": "PARTNER_1",
        "name": "Beispielpartner"
    },
    "receiver": {
        "clientId": "STUDIO_2"
    },
    "messageType": "createPerson",
    "payload": {
            "firstName": "Max",
            "lastName": "Mustermann",
            "id": "12b-1350",
            "email": "max.mustermann@gmx.de",
            "rfidList": ["12345678902345"],
            "street": "Teststrasse 1",
            "zipCode": "45678",
            "city": "Neudorf",
            "imageData: "/9j/4AAQSkZJRgABA ... "
            // Bilder werden als base64 codiertes Byte Array übergeben
    }
}

```

## Nachrichtentypen

Folgende Nachrichtentypen sind definiert mit ihrem entsprechenden Nutzdatenformat definiert:

### Personendaten anlegen, ändern und löschen

Um Personendaten anzulegen oder zu ändern, sind die beiden Nachrichtentypen **`createPerson`** und **`updatePerson`** definiert. Um eine Person zu löschen **`deletePerson`** Die zugehörigen Nutzdaten müssen im Format **Person** vorliegen.

medo.check besitzt eine Matching-Logik, um Dubletten zu erkennen. Ein in medo.check bereits vorhandener Kunde wird also im Fall von `createPerson` nicht erneut angelegt. Es sollte aber darauf geachtet werden, immer die korrekte Aktion im Nachrichtentyp anzugeben.

> **ACHTUNG**: Wird eine Person gelöscht bedeuted dies, dass in medo.check auch alle dazugehörigen Daten wie Dokumente, Check-Ups, Trainingspläne usw. gelöscht werden. Es sollte mit dem Kunden abgesprochen werden, wann ein Kunde in medo.check gelöscht werden soll, wann das Partnersystem also die Aktion sendet.

#### Person

|    |   Type | Description | Required  |
| -- | ------ | ----------- | --------- |
| id | `string`| **Eindeutige ID** im System des Partners.  | yes |
| firstName | `string`| Vorname | yes |
| lastName | `string`| Nachname | yes |
| gender | `string`| Geschlecht, gültige Werte: *male* und *female* | yes |
| dateOfBirth | `string`| Geburtsdatum im Format `yyyy-mm-dd`| yes |
| rfidList | `array<string>` | Liste mit zuordneten RFID Medien / Zugangsmedien | yes |
| contractType | `string`| ID der Vertragsart. Kann in medo.check einem Betreuungsprofil zugeordnet werden. | no |
| startOfContract | `string`| Vertragsstart im Format `yyyy-mm-dd`. Der Vertragsstart bedeutet in diesem Fall, wann mit dem Training und dem Betreuungsablauf begonnen werden soll | no
| endOfContract | `string`| Vertragsende im Format `yyyy-mm-dd`. Das Vertragsende bedeut in diesem Fall, wann die Betreuung und damit der Betreuungsablauf endet. | no |
| contractActive | `boolean` | Vertrag ist aktuell aktiv | no |
| street | `string`| Strasse | no |
| streetAdditional | `string`| Adresszusatz | no |
| zipCode | `string` | Postleitzahl | no |
| city | `string` | Stadt | no |
| country | `string` | Land / Staat | no |
| phone | `string`| Telefonnummer | no |
| mobile | `string`| Mobilnummer | no |
| fax | `string` | Faxnummer | no
| email | `string`| Emailadresse | no |
| skype | `string`| Skype-Kontakt | no |
| prospect | `boolean`| Ist die Person nur ein Interessent? | no |
| imageData | `string` | Bild der Person (Jpeg oder Png) als Base64 kodiertes Byte-Array | no

### Check-in und Check-out

Die Nachrichtentypen sind **`checkIn`** und **`checkOut`**.

> **ACHTUNG:** Damit Check-in und Check-out funktionieren, muss die Person zuvor mit `createPerson` in medo.check angelegt bzw. verknüpft worden sein.

> **ACHTUNG:** Bei mehreren Standorten muss unbedingt die Standort-Id in der Nachricht gesetzt sein, damit der richtige Standort zugewiesen werden kann.

Die Nutzdaten sind wie folgt definiert:

#### Check-in / -out

|    |   Type | Description | Required  |
| -- | ------ | ----------- | --------- |
| timestamp | `string` | Zeitpunkt im [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) Format (Beispiel: 2017-08-02T05:19:40+00:00) | yes
| personId | `string` | Die Id der Person im System des Partners | yes |

## Response

Wenn eine Nachricht korrekt von der [medo.check Messaging API](https://messaging.medocheck.com) verarbeitet wurde, enthält der Sender einen Response mit Statuscode **400 Ok**. In allen anderen Fällen liegt ein Fehler vor. Im Body des Fehlerresponse steh die vom Server mitgeteilte Ausnahme.

Im Erfolgsfall enthält die Anwort im Body die gesendete Nachricht, erweitert um folgendes Feld:

|    |   Type | Description | Required  |
| -- | ------ | ----------- | --------- |
| receivedOn | `string` | Zeitstempel des Eingangszeitpunktes der Nachricht auf dem Server im [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) Format. | yes |

Die oben gesendete Beispielnachricht wird beispielsweise so erweitert:

```json
{
    "id": "088eee45-0935-4e61-a91d-c1f0d6561120",
    ...
    "payload": {
        ...
    },
    "receivedOn": "2017-09-28T09:03:33.7486450Z"
}
```

## Testing

Die [medo.check Messaging API](https://messaging.medocheck.com) stellt einen Testclient zur Verfügung, der die gesendeten Nachrichten abholt und ausgibt. Lassen Sie sich von medo.check einen Test-API Key geben. Schicken Sie Ihre Testnachrichten mit diesem API-Key. Öffnen Sie den Client und geben Sie diesen API-Key in das Eingabefeld ein. Der Test-Client findet die neue Nachricht und zeigt diese in einer Liste an. Klicken Sie auf das Listenelement, um die Nachricht im Json-Format zu anzuzeigen. So sehen Sie genau, was von der Software gesendet wurde.

- [medo.check Messaging API - Testclient](https://dev-messaging.medocheck.com)

> **Hinweis:** Die Nachricht wird vom Client direkt als verarbeitet bestätigt und wird somit auf Serverseite gelöscht. Starten Sie den Client erneut, ist die Liste leer.

## Datenschutz

[medo.check Messaging API](https://messaging.medocheck.com) stellt einen HTTPS Endpunkt zur Verfügung. Alle Daten an die API werden also verschlüsselt übertragen. Da keine API-Keys oder sonstige Daten in der URL, sondern lediglich im verschlüsselten Inhalt der Nachricht übertragen werden, ist Außenstehenden kein Zugriff auf wichtige Daten möglich, ohne erhebliche kriminelle Energie aufzuwenden.

Die Inhalte der Nachrichten werden nur solange gespeichert, bis sie vom medo.check System des gemeinsamen Kunden abgeholt und verarbeitet wurden. Dann wird die komplette Nachricht mit Inhalt gelöscht. medo.check erhebt zu jeder Nachricht die Daten, wann welcher Partner eine Nachricht für einen gemeinsamen Kunden gesendet hat und wann diese Nachricht vom medo.check System verarbeitet wurde, um im Problemfall dieses Log einsehen zu können. Es werden *KEINE NACHRICHTENINHALTE* zu diesen Logs gespeichert.

> **Hinweis:** Jeder Schnittstellenpartner sollte mit medo.check eine Auftragsdatenverarbeitung vereinbaren, da Daten von seinem System an das medo.check System übertragen werden. Jeder Schnittstellenpartner sollte seine Kunden zusätzlich darauf hinweisen und informieren, dass diese in Ihre Verträge einen Hinweis aufnehmen, dass die Daten zur optimalen Betreuungs- und Trainingssteuerung an Dritte, in diesem Fall medo.check, übertragen werden.

## Changelog

### 01.10.2017 - Version 1
- Stammdaten über die Nachrichtentypen createPerson, updatePerson, deletePerson
- Check-In / Check-Out über die Nachrichtentypen checkIn, checkOut
