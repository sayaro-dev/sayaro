import { useCallback, useState, type DragEvent, type ChangeEvent } from "react";
import { set, unset } from "sanity";
import type { StringInputProps } from "sanity";
import { Button, Card, Flex, Stack, Text, Spinner } from "@sanity/ui";
import { TrashIcon, UploadIcon } from "lucide-react";

const UPLOAD_API =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_APP_URL
    ? process.env.NEXT_PUBLIC_APP_URL
    : "http://localhost:3000") + "/api/upload-r2";

function getFolder(schemaName: string | undefined): string {
  switch (schemaName) {
    case "product":
      return "products";
    case "industry":
      return "industries";
    case "testimonial":
      return "testimonials";
    case "post":
      return "posts";
    default:
      return "uploads";
  }
}

export function R2ImageInput(props: StringInputProps) {
  const { value, onChange, schemaType } = props;
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const folder = getFolder(schemaType.name === "imageUrl" || schemaType.name === "coverImageUrl"
    ? (props as unknown as { path: Array<string | number> }).path?.[0] as string | undefined
    : undefined);

  const documentType = (props as unknown as { document?: { _type?: string } }).document?._type;
  const resolvedFolder = getFolder(documentType);

  const upload = useCallback(
    async (file: File) => {
      setError(null);
      setUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", resolvedFolder);

        const res = await fetch(UPLOAD_API, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `Upload failed (${res.status})`);
        }

        const { url } = await res.json();
        onChange(set(url));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onChange, resolvedFolder]
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        upload(file);
      } else {
        setError("Please drop an image file");
      }
    },
    [upload]
  );

  const handleFileSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) upload(file);
    },
    [upload]
  );

  const handleRemove = useCallback(async () => {
    if (!value) return;

    try {
      await fetch(UPLOAD_API, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: value }),
      });
    } catch {
      // Image removal from R2 is best-effort
    }

    onChange(unset());
  }, [value, onChange]);

  if (value) {
    return (
      <Stack space={3 as never}>
        <Card
          border
          radius={2}
          overflow="hidden"
          style={{ position: "relative" }}
        >
          <img
            src={value}
            alt="Uploaded image"
            style={{
              display: "block",
              width: "100%",
              maxHeight: 300,
              objectFit: "cover",
            }}
          />
        </Card>
        <Flex gap={2}>
          <Button
            icon={TrashIcon}
            text="Remove"
            tone="critical"
            mode="ghost"
            onClick={handleRemove}
          />
          <label>
            <Button
              icon={UploadIcon}
              text="Replace"
              mode="ghost"
              as="span"
              style={{ cursor: "pointer" }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
          </label>
        </Flex>
      </Stack>
    );
  }

  return (
    <Stack space={3 as never}>
      <Card
        border
        radius={2}
        padding={5 as never}
        tone={dragOver ? "primary" : error ? "critical" : "default"}
        style={{
          borderStyle: "dashed",
          cursor: uploading ? "wait" : "pointer",
          textAlign: "center",
        }}
        onDragOver={(e: DragEvent) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => {
          if (!uploading) {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) upload(file);
            };
            input.click();
          }
        }}
      >
        <Flex direction="column" align="center" gap={3}>
          {uploading ? (
            <>
              <Spinner />
              <Text size={1} muted>
                Uploading...
              </Text>
            </>
          ) : (
            <>
              <UploadIcon style={{ fontSize: 32, opacity: 0.4 }} />
              <Text size={1} muted>
                Drop an image here or click to browse
              </Text>
            </>
          )}
        </Flex>
      </Card>
      {error && (
        <Card padding={3 as never} radius={2} tone="critical">
          <Text size={1}>{error}</Text>
        </Card>
      )}
    </Stack>
  );
}
